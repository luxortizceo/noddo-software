"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Links de invitación/magic link/recuperación llegan aquí de 3 formas
  // posibles según la plantilla de correo de Supabase: ?code= (PKCE),
  // ?token_hash=&type= (OTP), o #access_token= (implícito, ya procesado por
  // el cliente al construirse). Cubrimos las tres antes de revisar sesión.
  useEffect(() => {
    const supabase = createClient();

    async function completeAuthFromUrl() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const tokenHash = url.searchParams.get("token_hash");
      const type = url.searchParams.get("type");

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      } else if (tokenHash && type) {
        await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as "invite" | "magiclink" | "recovery" | "email",
        });
      } else if (window.location.hash.includes("access_token")) {
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/plataforma");
        router.refresh();
      }
    }

    completeAuthFromUrl();
  }, [router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    router.push("/plataforma");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-sm">
        <Link href="/" className="text-lg font-bold tracking-tight">
          NODDO<span className="text-brand">.</span>
        </Link>
        <h1 className="mt-6 text-xl font-semibold">Plataforma interna</h1>
        <p className="mt-1 text-sm text-muted">
          Acceso solo para asesores y equipo de Noddo.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
