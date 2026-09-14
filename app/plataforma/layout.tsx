import { getCurrentProfile } from "@/lib/supabase/profile";
import PlataformaNav from "./PlataformaNav";

export default async function PlataformaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  // El middleware ya protege /plataforma/*; login es la única ruta pública dentro de este layout.
  if (!profile) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PlataformaNav role={profile.role} fullName={profile.full_name} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
