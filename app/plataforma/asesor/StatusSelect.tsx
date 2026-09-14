"use client";

import { useTransition } from "react";
import { updateProspectStatus } from "./actions";

export default function StatusSelect({
  prospectId,
  statuses,
  currentStatusId,
}: {
  prospectId: string;
  statuses: { id: string; label: string }[];
  currentStatusId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentStatusId}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() => {
          updateProspectStatus(prospectId, e.target.value);
        })
      }
      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm disabled:opacity-60"
    >
      {statuses.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
