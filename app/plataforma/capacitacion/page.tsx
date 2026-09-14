import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/format";
import ConfirmAttendanceButton from "./ConfirmAttendanceButton";

export default async function CapacitacionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nowIso = new Date().toISOString();

  const [{ data: upcoming }, { data: past }, { data: myAttendance }] = await Promise.all([
    supabase
      .from("training_sessions")
      .select("id, title, scheduled_at, zoom_link")
      .gte("scheduled_at", nowIso)
      .order("scheduled_at"),
    supabase
      .from("training_sessions")
      .select("id, title, scheduled_at, recording_url")
      .not("recording_url", "is", null)
      .order("scheduled_at", { ascending: false }),
    supabase.from("session_attendance").select("session_id, confirmed").eq("advisor_id", user!.id),
  ]);

  const confirmedMap = new Map((myAttendance ?? []).map((a) => [a.session_id, a.confirmed]));

  const recordings = await Promise.all(
    (past ?? []).map(async (recordedSession) => {
      if (!recordedSession.recording_url) {
        return { ...recordedSession, playbackUrl: null };
      }
      const { data } = await supabase.storage
        .from("recordings")
        .createSignedUrl(recordedSession.recording_url, 60 * 60);
      return { ...recordedSession, playbackUrl: data?.signedUrl ?? null };
    })
  );

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-xl font-semibold">Próximas sesiones en vivo</h1>
        <div className="mt-4 flex flex-col gap-3">
          {upcoming?.length === 0 && (
            <p className="text-sm text-muted">No hay sesiones programadas por ahora.</p>
          )}
          {upcoming?.map((session) => (
            <div
              key={session.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{session.title}</p>
                <p className="text-sm text-muted">{formatDateTime(session.scheduled_at)}</p>
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
              </div>
              <ConfirmAttendanceButton
                sessionId={session.id}
                confirmed={confirmedMap.get(session.id) ?? false}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Grabaciones</h2>
        <div className="mt-4 flex flex-col gap-3">
          {recordings.length === 0 && (
            <p className="text-sm text-muted">Todavía no hay grabaciones subidas.</p>
          )}
          {recordings.map((session) => (
            <div key={session.id} className="rounded-xl border border-border bg-background p-4">
              <p className="font-medium">{session.title}</p>
              <p className="text-sm text-muted">{formatDateTime(session.scheduled_at)}</p>
              {session.playbackUrl && (
                <video controls className="mt-3 w-full rounded-lg" src={session.playbackUrl} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
