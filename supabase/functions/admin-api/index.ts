import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Simple HMAC-based token: hash(password + date) so it's valid for 24h
async function generateToken(password: string): Promise<string> {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(day));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyToken(token: string, password: string): Promise<boolean> {
  const expected = await generateToken(password);
  return token === expected;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const adminPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!adminPassword) {
    return jsonResponse({ error: "Admin password not configured" }, 500);
  }

  try {
    const body = await req.json();
    const { action } = body;

    // --- LOGIN ---
    if (action === "login") {
      const { password } = body;
      if (password !== adminPassword) {
        return jsonResponse({ error: "Invalid password" }, 401);
      }
      const token = await generateToken(adminPassword);
      return jsonResponse({ success: true, token });
    }

    // --- ALL OTHER ACTIONS REQUIRE TOKEN ---
    const token = req.headers.get("x-admin-token") || body.token;
    if (!token || !(await verifyToken(token, adminPassword))) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    // Use service role for admin operations
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- LIST PRODUCTS ---
    if (action === "list") {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ products: data });
    }

    // --- CREATE PRODUCT ---
    if (action === "create") {
      const { name, description, price, old_price, category, image_url, file_url } = body;
      if (!name || price === undefined) {
        return jsonResponse({ error: "Name and price are required" }, 400);
      }
      const { data, error } = await supabase.from("products").insert({
        name: String(name).slice(0, 200),
        description: description ? String(description).slice(0, 2000) : null,
        price: Number(price),
        old_price: old_price ? Number(old_price) : null,
        category: ["PDF", "Course", "Template", "Tool"].includes(category) ? category : "PDF",
        image_url: image_url ? String(image_url).slice(0, 1000) : null,
        file_url: file_url ? String(file_url) : null,
      }).select().single();
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ product: data });
    }

    // --- UPDATE PRODUCT ---
    if (action === "update") {
      const { id, name, description, price, old_price, category, image_url, file_url } = body;
      if (!id) return jsonResponse({ error: "Product ID required" }, 400);
      const payload: Record<string, unknown> = {};
      if (name !== undefined) payload.name = String(name).slice(0, 200);
      if (description !== undefined) payload.description = description ? String(description).slice(0, 2000) : null;
      if (price !== undefined) payload.price = Number(price);
      if (old_price !== undefined) payload.old_price = old_price ? Number(old_price) : null;
      if (category !== undefined) payload.category = ["PDF", "Course", "Template", "Tool"].includes(category) ? category : "PDF";
      if (image_url !== undefined) payload.image_url = image_url ? String(image_url).slice(0, 1000) : null;
      if (file_url !== undefined) payload.file_url = file_url ? String(file_url) : null;

      const { data, error } = await supabase.from("products").update(payload).eq("id", id).select().single();
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ product: data });
    }

    // --- DELETE PRODUCT ---
    if (action === "delete") {
      const { id } = body;
      if (!id) return jsonResponse({ error: "Product ID required" }, 400);
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ success: true });
    }

    // --- UPLOAD URL (generate signed upload URL) ---
    if (action === "upload") {
      const { filename } = body;
      if (!filename) return jsonResponse({ error: "Filename required" }, 400);
      const ext = String(filename).split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("digital-products").upload(path, new Uint8Array(0), { upsert: true });
      // We'll return the public URL and path for client-side upload
      const { data: urlData } = supabase.storage.from("digital-products").getPublicUrl(path);
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ path, publicUrl: urlData.publicUrl });
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (e) {
    return jsonResponse({ error: "Bad request" }, 400);
  }
});
