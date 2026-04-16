import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const prerender = false;

const R2_BUCKET = import.meta.env.R2_BUCKET_NAME;
const PUBLIC_R2_URL = "https://pub-7dd27b2d2fb34a2289eac5056721ab3e.r2.dev";

const s3Client = new S3Client({
  region: "auto",
  endpoint: import.meta.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
  },
});

const INITIAL_STOCK = {
  polera: 25,
  "gorra-convencion": 25,
  "gorra-leones": 25,
  "llavero-cinta": 25,
  abridor: 25,
  tomatodo: 25,
  taza: 25,
};

async function getStock() {
  try {
    const response = await fetch(`${PUBLIC_R2_URL}/souvenir-stock.json`, {
      cache: "no-store",
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.log("Stock file not found, using initial");
  }
  return INITIAL_STOCK;
}

async function saveStock(stock: Record<string, number>) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: "souvenir-stock.json",
      Body: JSON.stringify(stock),
      ContentType: "application/json",
    })
  );
}

function generateReservationCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SOV-${timestamp.slice(-4)}${random}`;
}

function calculateTotal(items: any[]): number {
  return items.reduce((total, item) => {
    return total + (item.unitPrice * item.quantity);
  }, 0);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const club = formData.get("club") as string;
    const itemsJson = formData.get("items") as string;
    const isPreventa = formData.get("isPreventa") === "true";

    if (!fullName || !phone || !itemsJson) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    const items = JSON.parse(itemsJson);
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "No hay productos seleccionados" }),
        { status: 400 }
      );
    }

    const stock = await getStock();
    for (const item of items) {
      const available = stock[item.id] || 0;
      if (item.quantity > available) {
        return new Response(
          JSON.stringify({
            error: `Stock insuficiente para ${item.id}. Disponible: ${available}, solicitado: ${item.quantity}`
          }),
          { status: 400 }
        );
      }
    }

    for (const item of items) {
      stock[item.id] = stock[item.id] - item.quantity;
    }
    await saveStock(stock);

    const reservationCode = generateReservationCode();
    const total = calculateTotal(items);

    const nuevaReserva = {
      id: Date.now().toString(),
      reservationCode,
      fullName,
      phone,
      club: club || "",
      isPreventa,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    let reservas = [];
    try {
      const indexResponse = await fetch(`${PUBLIC_R2_URL}/reservas-souvenirs.json`, {
        cache: "no-store",
      });
      if (indexResponse.ok) {
        reservas = await indexResponse.json();
      }
    } catch (e) {
      console.log("Index file not found, creating new one");
    }

    reservas.push(nuevaReserva);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: "reservas-souvenirs.json",
        Body: JSON.stringify(reservas),
        ContentType: "application/json",
      })
    );

    return new Response(
      JSON.stringify({ success: true, reservation: nuevaReserva }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("R2 Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};