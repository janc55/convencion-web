import type { APIRoute } from "astro";
import { supabase } from "../../db/supabase";

export const prerender = false;

console.log("[DEBUG] Environment check:");
console.log("[DEBUG] SUPABASE_URL set:", !!import.meta.env.SUPABASE_URL);
console.log("[DEBUG] SUPABASE_KEY set:", !!import.meta.env.SUPABASE_KEY);
console.log("[DEBUG] SUPABASE_URL value:", import.meta.env.SUPABASE_URL);

function generateRegistrationCode(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `LCB-${year}-${random}`;
}

function generateQrCode(): string {
  return `qr_${crypto.randomUUID()}`;
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "jpg";
}

export const POST: APIRoute = async ({ request }) => {
  console.log("[DEBUG] POST /api/register called");
  try {
    const formData = await request.formData();

    // Extract text fields
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const club = formData.get("club") as string | null;
    const district = formData.get("district") as string | null;
    const country = formData.get("country") as string | null;
    const roleTitle = formData.get("role_title") as string | null;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const participantType = formData.get("participant_type") as string;
    const lionNumber = formData.get("lion_number") as string | null;
    const specialRequirements = formData.get("special_requirements") as string | null;

    // Validate required fields
    if (!firstName || !lastName || !email || !participantType) {
      return new Response(
        JSON.stringify({ error: "Nombre, apellidos, correo y tipo de participante son obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate codes
    const registrationCode = generateRegistrationCode();
    const qrCode = generateQrCode();
    const badgeName = `${firstName} ${lastName}`;

    // Extract files
    const photoFile = formData.get("photo") as File | null;
    const voucherFile = formData.get("voucher") as File | null;

    let photoUrl: string | null = null;
    let voucherUrl: string | null = null;

    // Upload photo to Supabase Storage
    if (photoFile && photoFile instanceof File && photoFile.size > 0) {
      const ext = getFileExtension(photoFile.name);
      const filePath = `photos/${registrationCode}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("eventmanagerdata")
        .upload(filePath, photoFile, {
          contentType: photoFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Photo upload error:", uploadError);
        return new Response(
          JSON.stringify({ error: `Error al subir la foto: ${uploadError.message}` }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const { data: urlData } = supabase.storage
        .from("eventmanagerdata")
        .getPublicUrl(filePath);

      photoUrl = urlData.publicUrl;
    }

    // Upload voucher to Supabase Storage
    if (voucherFile && voucherFile instanceof File && voucherFile.size > 0) {
      const ext = getFileExtension(voucherFile.name);
      const filePath = `vouchers/${registrationCode}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("eventmanagerdata")
        .upload(filePath, voucherFile, {
          contentType: voucherFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Voucher upload error:", uploadError);
        return new Response(
          JSON.stringify({ error: `Error al subir el voucher: ${uploadError.message}` }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const { data: urlData } = supabase.storage
        .from("eventmanagerdata")
        .getPublicUrl(filePath);

      voucherUrl = urlData.publicUrl;
    }

    // Insert participant into database
    const { error: dbError } = await supabase
      .from("participants")
      .insert({
        first_name: firstName,
        last_name: lastName,
        badge_name: badgeName,
        document_number: null,
        country: country || "Bolivia",
        district: district || null,
        club: club || null,
        role_title: roleTitle || null,
        email: email.toLowerCase(),
        phone: phone || null,
        participant_type: participantType,
        lion_number: lionNumber || null,
        special_requirements: specialRequirements || null,
        notes: null,
        registration_code: registrationCode,
        qr_code: qrCode,
        status: "pre_registered",
        photo_url: photoUrl,
        voucher_url: voucherUrl,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);

      // Check for duplicate email
      if (dbError.code === "23505") {
        return new Response(
          JSON.stringify({ error: "Este correo electrónico ya está registrado." }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: `Error al guardar el registro: ${dbError.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        registration_code: registrationCode,
        message: `Registro exitoso. Su código es: ${registrationCode}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.log("[DEBUG] Full error:", errorMessage);
    return new Response(
      JSON.stringify({ 
        error: "Error inesperado. Inténtelo de nuevo.",
        debug: errorMessage 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
