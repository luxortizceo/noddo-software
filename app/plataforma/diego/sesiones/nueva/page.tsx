import FormField from "@/app/plataforma/FormField";
import { createSession } from "../../actions";

export default function NuevaSesionPage() {
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-xl font-semibold">Programar sesión</h1>

      <form action={createSession} className="mt-6 flex flex-col gap-4">
        <FormField label="Título" name="title" required />

        <div>
          <label htmlFor="description" className="text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <FormField label="Fecha y hora" name="scheduled_at" type="datetime-local" required />
        <FormField label="Enlace de Zoom" name="zoom_link" type="url" />

        <button
          type="submit"
          className="mt-2 self-start rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Programar
        </button>
      </form>
    </div>
  );
}
