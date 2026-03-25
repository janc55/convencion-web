import type { APIRoute } from "astro";

export const prerender = false;

const BACKEND_URL = "https://api.clubdeleonesbolivia.lat/api/registration/register";
const API_KEY = "lions-registration-secret-2026";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const backendFormData = new FormData();

    const fieldMapping: Record<string, string> = {
      first_name: "firstName",
      last_name: "lastName",
      role_title: "roleTitle",
      participant_type: "participantType",
      lion_number: "lionNumber",
      special_requirements: "specialRequirements",
      documentNumber: "documentNumber",
    };

    for (const [formKey, apiKey] of Object.entries(fieldMapping)) {
      const value = formData.get(formKey);
      if (value && typeof value === "string") {
        backendFormData.append(apiKey, value);
      }
    }

    const textFields = ["country", "district", "club", "email", "phone", "notes"];
    for (const field of textFields) {
      const value = formData.get(field);
      if (value && typeof value === "string") {
        backendFormData.append(field, value);
      }
    }

    backendFormData.set("paidAmount", "0");
    backendFormData.set("expectedAmount", "0");

    const firstName = formData.get("first_name") as string | null;
    const lastName = formData.get("last_name") as string | null;
    if (firstName && lastName) {
      backendFormData.set("badgeName", `${firstName} ${lastName}`);
    }

    const photo = formData.get("photo") as File | null;
    const voucher = formData.get("voucher") as File | null;

    if (photo && photo instanceof File && photo.size > 0) {
      backendFormData.append("photo", photo);
    }

    if (voucher && voucher instanceof File && voucher.size > 0) {
      backendFormData.append("voucher", voucher);
    }

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
      },
      body: backendFormData,
    });

    const contentType = response.headers.get("content-type");
    let responseData: any;

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Proxy Error:", err);
    return new Response(
      JSON.stringify({ error: `Error de conexión: ${err.message || String(err)}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
