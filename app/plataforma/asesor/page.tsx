import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatusSelect from "./StatusSelect";

export default async function AsesorPage() {
  const supabase = await createClient();

  const [{ data: prospects }, { data: statuses }] = await Promise.all([
    supabase
      .from("prospects")
      .select("id, business_name, contact_name, phone, status_id")
      .order("updated_at", { ascending: false }),
    supabase.from("client_statuses").select("id, label").order("sort_order"),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mis prospectos</h1>
        <Link
          href="/plataforma/asesor/nuevo"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          + Nuevo prospecto
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {prospects?.length === 0 && (
          <p className="text-sm text-muted">
            Aún no tienes prospectos. Agrega el primero.
          </p>
        )}

        {prospects?.map((prospect) => (
          <div
            key={prospect.id}
            className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link
                href={`/plataforma/asesor/${prospect.id}/editar`}
                className="font-medium hover:text-brand"
              >
                {prospect.business_name}
              </Link>
              <p className="text-sm text-muted">
                {[prospect.contact_name, prospect.phone].filter(Boolean).join(" · ") ||
                  "Sin datos de contacto"}
              </p>
            </div>

            <StatusSelect
              prospectId={prospect.id}
              statuses={statuses ?? []}
              currentStatusId={prospect.status_id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
