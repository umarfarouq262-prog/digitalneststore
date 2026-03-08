import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formPassword = (e.currentTarget.elements.namedItem("password") as HTMLInputElement | null)?.value ?? "";
    const rawPassword = password || formPassword || passwordRef.current?.value || "";

    if (!rawPassword) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-api", {
        body: { action: "login", password: rawPassword },
      });

      if (fnError || !data?.success) {
        setError(data?.error || fnError?.message || "Invalid password");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("admin_token", data.token);
      setPassword("");
      navigate("/dashboard");
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-2xl font-display text-foreground">Admin Access</CardTitle>
          <CardDescription className="text-muted-foreground font-body">
            Enter your admin password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                autoComplete="current-password"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying…" : "Enter Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
