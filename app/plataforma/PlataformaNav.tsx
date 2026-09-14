"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/supabase/profile";

const LINKS: Record<UserRole, { href: string; label: string }[]> = {
  asesor: [
    { href: "/plataforma/asesor", label: "Mis prospectos" },
    { href: "/plataforma/capacitacion", label: "Capacitación" },
  ],
  diego: [
    { href: "/plataforma/diego", label: "Sesiones" },
    { href: "/plataforma/diego/estatus", label: "Estatus" },
    { href: "/plataforma/capacitacion", label: "Capacitación" },
  ],
  admin: [],
};

export default function PlataformaNav({
  role,
  fullName,
}: {
  role: UserRole;
  fullName: string;
}) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/plataforma/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/plataforma" className="text-lg font-bold tracking-tight">
          NODDO<span className="text-brand">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS[role].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted sm:inline">{fullName}</span>
          <button
            onClick={handleLogout}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
          >
            Salir
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-4 overflow-x-auto border-t border-border px-6 py-2 md:hidden">
        {LINKS[role].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-sm font-medium text-muted hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
