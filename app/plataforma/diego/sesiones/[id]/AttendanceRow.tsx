"use client";

import { useTransition } from "react";
import { markAttended } from "../../actions";

export default function AttendanceRow({
  sessionId,
  advisorId,
  advisorName,
  confirmed,
  attended,
}: {
  sessionId: string;
  advisorId: string;
  advisorName: string;
  confirmed: boolean;
  attended: boolean | null;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between gap-3 p-4">
      <div>
        <p className="text-sm font-medium">{advisorName}</p>
        <p className="text-xs text-muted">
          {confirmed ? "Confirmó asistencia" : "No ha confirmado"}
        </p>
      </div>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            markAttended(sessionId, advisorId, !attended);
          })
        }
        className={
          attended
            ? "rounded-full border border-brand bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand"
            : "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface"
        }
      >
        {attended ? "Asistió ✓" : "Marcar asistió"}
      </button>
    </div>
  );
}
