const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (!adminPassword) {
      return jsonResponse({ error: "Admin password not configured" }, 500);
    }

    if (password !== adminPassword) {
      return jsonResponse({ error: "Invalid password" }, 401);
    }

    // Keep response shape compatible with older frontend builds.
    return jsonResponse({ success: true, token: crypto.randomUUID() });
  } catch {
    return jsonResponse({ error: "Bad request" }, 400);
  }
});
