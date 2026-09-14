import { createClient } from "@/lib/supabase/server";
import { addStatus, deleteStatus } from "./actions";

export default async function EstatusPage() {
  const supabase = await createClient();
  const { data: statuses } = await supabase
    .from("client_statuses")
    .select("id, label")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-xl font-semibold">Estatus de prospectos</h1>
      <p className="mt-1 text-sm text-muted">
        Estos son los estatus que los asesores pueden usar en sus prospectos.
      </p>

      <div className="mt-6 flex flex-col divide-y divide-border rounded-xl border border-border bg-background">
        {statuses?.length === 0 && (
          <p className="p-4 text-sm text-muted">No hay estatus todavía.</p>
        )}
        {statuses?.map((status) => (
          <div key={status.id} className="flex items-center justify-between p-4">
            <span className="text-sm font-medium">{status.label}</span>
            <form action={deleteStatus.bind(null, status.id)}>
              <button
                type="submit"
                className="text-xs font-medium text-muted transition-colors hover:text-red-600"
              >
                Eliminar
              </button>
            </form>
          </div>
        ))}
      </div>

      <form action={addStatus} className="mt-6 flex gap-2">
        <input
          name="label"
          required
          placeholder="Nuevo estatus"
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
