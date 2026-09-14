"use client";

import { useTransition } from "react";
import { confirmAttendance } from "./actions";

export default function ConfirmAttendanceButton({
  sessionId,
  confirmed,
}: {
  sessionId: string;
  confirmed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          confirmAttendance(sessionId, !confirmed);
        })
      }
      className={
        confirmed
          ? "rounded-full border border-brand bg-brand/10 px-4 py-2 text-sm font-medium text-brand"
          : "rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
      }
    >
      {confirmed ? "Asistencia confirmada ✓" : "Confirmar asistencia"}
    </button>
  );
}
