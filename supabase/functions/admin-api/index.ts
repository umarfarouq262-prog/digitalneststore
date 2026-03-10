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
      const { name, description, price, old_price, category, image_url, file_url, product_type, affiliate_url } = body;
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
        product_type: product_type === "affiliate" ? "affiliate" : "my_product",
        affiliate_url: affiliate_url ? String(affiliate_url).slice(0, 2000) : null,
      }).select().single();
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ product: data });
    }

    // --- UPDATE PRODUCT ---
    if (action === "update") {
      const { id, name, description, price, old_price, category, image_url, file_url, product_type, affiliate_url } = body;
      if (!id) return jsonResponse({ error: "Product ID required" }, 400);
      const payload: Record<string, unknown> = {};
      if (name !== undefined) payload.name = String(name).slice(0, 200);
      if (description !== undefined) payload.description = description ? String(description).slice(0, 2000) : null;
      if (price !== undefined) payload.price = Number(price);
      if (old_price !== undefined) payload.old_price = old_price ? Number(old_price) : null;
      if (category !== undefined) payload.category = ["PDF", "Course", "Template", "Tool"].includes(category) ? category : "PDF";
      if (image_url !== undefined) payload.image_url = image_url ? String(image_url).slice(0, 1000) : null;
      if (file_url !== undefined) payload.file_url = file_url ? String(file_url) : null;
      if (product_type !== undefined) payload.product_type = product_type === "affiliate" ? "affiliate" : "my_product";
      if (affiliate_url !== undefined) payload.affiliate_url = affiliate_url ? String(affiliate_url).slice(0, 2000) : null;

      const { data, error } = await supabase.from("products").update(payload).eq("id", id).select().single();
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ product: data });
    }

    // --- DELETE PRODUCT ---
    if (action === "delete") {
      const { id } = body;
      if (!id) return jsonResponse({ error: "Product ID required" }, 400);

      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", String(id))
        .select("id");

      if (error) return jsonResponse({ error: error.message }, 400);
      if (!data || data.length === 0) {
        return jsonResponse({ error: "Product not found or already deleted" }, 404);
      }

      return jsonResponse({ success: true, deletedId: data[0].id });
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

    // --- ANALYTICS ---
    if (action === "analytics") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const since = thirtyDaysAgo.toISOString();

      // Total unique visitors
      const { data: pvAll } = await supabase
        .from("page_views")
        .select("visitor_id, created_at")
        .gte("created_at", since);

      const uniqueVisitors = new Set((pvAll || []).map((v: any) => v.visitor_id)).size;

      // Visitors by day
      const visitorByDay: Record<string, Set<string>> = {};
      for (const pv of pvAll || []) {
        const day = pv.created_at.slice(0, 10);
        if (!visitorByDay[day]) visitorByDay[day] = new Set();
        visitorByDay[day].add(pv.visitor_id);
      }
      const visitorData = Object.entries(visitorByDay)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, set]) => ({ date: date.slice(5), visitors: set.size }));

      // Orders / sales
      const { data: orders } = await supabase
        .from("orders")
        .select("quantity, total_price, created_at, product_id")
        .gte("created_at", since);

      const totalSales = (orders || []).reduce((s: number, o: any) => s + o.quantity, 0);
      const totalRevenue = (orders || []).reduce((s: number, o: any) => s + Number(o.total_price), 0);

      // Sales by day
      const salesByDay: Record<string, { sales: number; revenue: number }> = {};
      for (const o of orders || []) {
        const day = o.created_at.slice(0, 10);
        if (!salesByDay[day]) salesByDay[day] = { sales: 0, revenue: 0 };
        salesByDay[day].sales += o.quantity;
        salesByDay[day].revenue += Number(o.total_price);
      }
      const salesData = Object.entries(salesByDay)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, v]) => ({ date: date.slice(5), sales: v.sales, revenue: v.revenue }));

      // Products by category
      const { data: prods } = await supabase.from("products").select("category");
      const catCount: Record<string, number> = {};
      for (const p of prods || []) {
        catCount[p.category] = (catCount[p.category] || 0) + 1;
      }
      const categoryData = Object.entries(catCount).map(([name, value]) => ({ name, value }));

      return jsonResponse({
        totalVisitors: uniqueVisitors,
        totalSales,
        totalRevenue,
        visitorData,
        salesData,
        categoryData,
      });
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("admin-api error:", e);
    return jsonResponse({ error: e instanceof Error ? e.message : "Bad request" }, 400);
  }
});
