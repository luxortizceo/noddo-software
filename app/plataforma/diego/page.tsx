import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";

export default async function DiegoPage() {
  const supabase = await createClient();

  const { data: sessions } = await supabase
    .from("training_sessions")
    .select("id, title, scheduled_at, status, recording_url")
    .order("scheduled_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Sesiones de capacitación</h1>
        <Link
          href="/plataforma/diego/sesiones/nueva"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          + Programar sesión
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {sessions?.length === 0 && (
          <p className="text-sm text-muted">Aún no hay sesiones programadas.</p>
        )}

        {sessions?.map((session) => (
          <Link
            key={session.id}
            href={`/plataforma/diego/sesiones/${session.id}`}
            className="flex flex-col gap-1 rounded-xl border border-border bg-background p-4 transition-colors hover:border-brand sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{session.title}</p>
              <p className="text-sm text-muted">{formatDateTime(session.scheduled_at)}</p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {session.status}
              {session.recording_url ? " · grabación subida" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
