import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import RescheduleForm from "./RescheduleForm";
import UploadRecordingForm from "./UploadRecordingForm";
import AttendanceRow from "./AttendanceRow";

export default async function SesionDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: session }, { data: advisors }, { data: attendance }] = await Promise.all([
    supabase.from("training_sessions").select("*").eq("id", id).single(),
    supabase.from("profiles").select("id, full_name").eq("role", "asesor").order("full_name"),
    supabase.from("session_attendance").select("*").eq("session_id", id),
  ]);

  if (!session) notFound();

  const attendanceMap = new Map((attendance ?? []).map((a) => [a.advisor_id, a]));

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold">{session.title}</h1>
      <p className="mt-1 text-sm text-muted">{formatDateTime(session.scheduled_at)}</p>
      {session.zoom_link && (
        <a
          href={session.zoom_link}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-brand hover:underline"
        >
          Enlace de Zoom
        </a>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Reagendar</h2>
        <div className="mt-2">
          <RescheduleForm sessionId={session.id} scheduledAt={session.scheduled_at} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Confirmaciones y asistencia
        </h2>
        <div className="mt-2 flex flex-col divide-y divide-border rounded-xl border border-border bg-background">
          {advisors?.length === 0 && (
            <p className="p-4 text-sm text-muted">Aún no hay asesores registrados.</p>
          )}
          {advisors?.map((advisor) => (
            <AttendanceRow
              key={advisor.id}
              sessionId={session.id}
              advisorId={advisor.id}
              advisorName={advisor.full_name}
              confirmed={attendanceMap.get(advisor.id)?.confirmed ?? false}
              attended={attendanceMap.get(advisor.id)?.attended ?? null}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Grabación</h2>
        <div className="mt-2">
          <p className="text-sm text-muted">
            {session.recording_url
              ? "Ya hay una grabación subida. Sube otra para reemplazarla."
              : "Todavía no se ha subido la grabación de esta clase."}
          </p>
          <div className="mt-3">
            <UploadRecordingForm sessionId={session.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
