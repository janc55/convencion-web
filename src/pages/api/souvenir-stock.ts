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

export const GET: APIRoute = async () => {
  try {
    const stock = await getStock();
    return new Response(JSON.stringify(stock), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching stock:", error);
    return new Response(JSON.stringify(INITIAL_STOCK), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};