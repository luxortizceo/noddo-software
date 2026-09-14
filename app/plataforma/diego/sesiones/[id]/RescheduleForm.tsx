"use client";

import { useState, useTransition } from "react";
import { rescheduleSession } from "../../actions";

export default function RescheduleForm({
  sessionId,
  scheduledAt,
}: {
  sessionId: string;
  scheduledAt: string;
}) {
  const [value, setValue] = useState(toLocalInputValue(scheduledAt));
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-lg border border-border px-3 py-2 text-sm"
      />
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            rescheduleSession(sessionId, new Date(value).toISOString());
          })
        }
        className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface disabled:opacity-60"
      >
        Reagendar
      </button>
    </div>
  );
}

function toLocalInputValue(iso: string) {
  const date = new Date(iso);
  const localMs = date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  return new Date(localMs).toISOString().slice(0, 16);
}
