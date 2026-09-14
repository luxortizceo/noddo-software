import { createClient } from "@/lib/supabase/server";
import FormField from "@/app/plataforma/FormField";
import { createProspect } from "../actions";

export default async function NuevoProspectoPage() {
  const supabase = await createClient();
  const { data: statuses } = await supabase
    .from("client_statuses")
    .select("id, label")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-xl font-semibold">Nuevo prospecto</h1>

      <form action={createProspect} className="mt-6 flex flex-col gap-4">
        <FormField label="Negocio" name="business_name" required />
        <FormField label="Nombre de contacto" name="contact_name" />
        <FormField label="Teléfono" name="phone" />
        <FormField label="Correo" name="email" type="email" />

        <div>
          <label htmlFor="status_id" className="text-sm font-medium">
            Estatus
          </label>
          <select
            id="status_id"
            name="status_id"
            required
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            {statuses?.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="text-sm font-medium">
            Notas
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <button
          type="submit"
          className="mt-2 self-start rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
