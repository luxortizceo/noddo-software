const STATS = [
  { value: "+30,000", label: "negocios mapeados en León, Irapuato y Salamanca" },
  { value: "$5,000", label: "MXN para tu primera presencia digital profesional" },
  { value: "2 equipos", label: "Sales y Producción, un solo objetivo" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--brand) 12%, transparent), transparent)",
        }}
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28">
        <span className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
          Website as a Service
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Convertimos las necesidades de tu negocio en{" "}
          <span className="text-brand">soluciones digitales</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          NODDO no vende páginas web: detecta lo que tu negocio necesita y te
          construye la solución alrededor de eso. Desde un sitio profesional
          hasta plataformas completas de e-commerce, reservaciones o gestión
          interna.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contacto"
            className="rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Solicita tu propuesta
          </a>
          <a
            href="#modelo"
            className="rounded-full border border-border px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-surface"
          >
            Conoce el modelo
          </a>
        </div>

        <dl className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="text-3xl font-bold text-brand">{stat.value}</dt>
              <dd className="mt-2 text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
