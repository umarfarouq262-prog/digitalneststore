import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const app = new Hono();

app.options("/*", (c) => c.json(null, 200, corsHeaders));

app.post("/", async (c) => {
  const { password } = await c.req.json();
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");

  if (!adminPassword) {
    return c.json({ error: "Admin password not configured" }, 500, corsHeaders);
  }

  if (password === adminPassword) {
    // Generate a simple session token
    const token = crypto.randomUUID();
    return c.json({ success: true, token }, 200, corsHeaders);
  }

  return c.json({ error: "Invalid password" }, 401, corsHeaders);
});

Deno.serve(app.fetch);
