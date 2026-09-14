import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FormField from "@/app/plataforma/FormField";
import { updateProspect } from "../../actions";

export default async function EditarProspectoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: prospect }, { data: statuses }] = await Promise.all([
    supabase.from("prospects").select("*").eq("id", id).single(),
    supabase.from("client_statuses").select("id, label").order("sort_order"),
  ]);

  if (!prospect) notFound();

  const updateProspectWithId = updateProspect.bind(null, id);

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-xl font-semibold">Editar prospecto</h1>

      <form action={updateProspectWithId} className="mt-6 flex flex-col gap-4">
        <FormField
          label="Negocio"
          name="business_name"
          required
          defaultValue={prospect.business_name}
        />
        <FormField
          label="Nombre de contacto"
          name="contact_name"
          defaultValue={prospect.contact_name ?? ""}
        />
        <FormField label="Teléfono" name="phone" defaultValue={prospect.phone ?? ""} />
        <FormField
          label="Correo"
          name="email"
          type="email"
          defaultValue={prospect.email ?? ""}
        />

        <div>
          <label htmlFor="status_id" className="text-sm font-medium">
            Estatus
          </label>
          <select
            id="status_id"
            name="status_id"
            required
            defaultValue={prospect.status_id}
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
            defaultValue={prospect.notes ?? ""}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <button
          type="submit"
          className="mt-2 self-start rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
