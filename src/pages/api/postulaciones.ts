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

export const GET: APIRoute = async () => {
    try {
        const response = await fetch(`${PUBLIC_R2_URL}/postulaciones.json`);
        if (!response.ok) {
            return new Response(JSON.stringify([]), { status: 200 });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify([]), { status: 200 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const nombre = formData.get("nombre") as string;
        const cargo = formData.get("cargo") as string;
        const club = formData.get("club") as string;
        const pdfFile = formData.get("pdf") as File;

        if (!nombre || !cargo || !club || !pdfFile) {
            return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400 });
        }

        if (pdfFile.size > 1024 * 1024) {
            return new Response(JSON.stringify({ error: "El archivo excede 1MB" }), { status: 400 });
        }

        // 1. Upload PDF to R2
        const fileName = `postulaciones/${Date.now()}-${pdfFile.name.replaceAll(' ', '_')}`;
        const pdfArrayBuffer = await pdfFile.arrayBuffer();
        const pdfUint8 = new Uint8Array(pdfArrayBuffer);

        await s3Client.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET,
                Key: fileName,
                Body: pdfUint8,
                ContentType: "application/pdf",
            })
        );

        const pdfUrl = `${PUBLIC_R2_URL}/${fileName}`;

        // 2. Update JSON index
        let postulaciones = [];
        try {
            const indexResponse = await fetch(`${PUBLIC_R2_URL}/postulaciones.json`, { cache: 'no-store' });
            if (indexResponse.ok) {
                postulaciones = await indexResponse.json();
            }
        } catch (e) {
            console.log("Index file not found, creating new one");
        }

        const nuevaPostulacion = {
            id: Date.now().toString(),
            nombre,
            cargo,
            club,
            pdfUrl,
            fecha: new Date().toISOString(),
        };

        postulaciones.push(nuevaPostulacion);

        await s3Client.send(
            new PutObjectCommand({
                Bucket: R2_BUCKET,
                Key: "postulaciones.json",
                Body: JSON.stringify(postulaciones),
                ContentType: "application/json",
            })
        );

        return new Response(JSON.stringify({ success: true, postulacion: nuevaPostulacion }), { status: 200 });
    } catch (error: any) {
        console.error("R2 Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
