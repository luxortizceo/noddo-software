const PLANES = [
  {
    name: "Presencia Digital",
    price: "Desde $5,000",
    period: "MXN",
    description: "Para negocios que necesitan verse profesionales en línea.",
    features: [
      "Sitio web a la medida (una o varias páginas)",
      "Diseño adaptado a tu marca",
      "Optimizado para celular",
      "Formulario de contacto",
      "Acompañamiento para dominio y hosting",
    ],
    highlighted: false,
  },
  {
    name: "Crecimiento",
    price: "Cotización",
    period: "según alcance",
    description: "Para negocios que quieren vender y gestionar en línea.",
    features: [
      "Catálogo digital o e-commerce",
      "Panel administrativo básico",
      "Integración con WhatsApp y redes",
      "Todo lo de Presencia Digital",
    ],
    highlighted: true,
  },
  {
    name: "Plataforma a Medida",
    price: "$60,000+",
    period: "MXN",
    description: "Para operaciones que necesitan un sistema propio.",
    features: [
      "Sistemas de reservaciones",
      "E-commerce completo",
      "Dashboards y reportes",
      "Automatizaciones e integraciones",
    ],
    highlighted: false,
  },
];

export default function Planes() {
  return (
    <section id="planes" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand">
            Planes
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Del sitio profesional a la plataforma completa
          </p>
          <p className="mt-4 text-muted">
            Cada propuesta se ajusta al negocio. Estos rangos te dan una idea
            de por dónde empieza cada tipo de solución.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANES.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-brand bg-background shadow-lg shadow-brand/10"
                  : "border-border bg-background"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 w-fit rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  Más solicitado
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-muted">{plan.period}</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-0.5 text-brand">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-brand text-white hover:bg-brand-dark"
                    : "border border-border text-foreground hover:bg-surface"
                }`}
              >
                Cotiza este plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
