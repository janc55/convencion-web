import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_KEY;
  
  return new Response(
    JSON.stringify({
      SUPABASE_URL: supabaseUrl ? "SET" : "NOT_SET",
      SUPABASE_URL_VALUE: supabaseUrl,
      SUPABASE_KEY: supabaseKey ? "SET" : "NOT_SET",
      SUPABASE_KEY_PREFIX: supabaseKey ? supabaseKey.substring(0, 20) + "..." : "N/A",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
