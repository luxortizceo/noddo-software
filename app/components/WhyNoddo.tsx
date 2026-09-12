const REASONS = [
  {
    title: "Base de prospectos propia",
    body: "Más de 30,000 negocios mapeados en León, Irapuato y Salamanca, con teléfonos, correos y datos clave para llegar a las oportunidades correctas.",
  },
  {
    title: "Equipo comercial capacitado",
    body: "Sales se enfoca en detectar oportunidades y acompañar la negociación, con capacitaciones presenciales y seguimiento constante.",
  },
  {
    title: "Proceso claro y medible",
    body: "Cada oportunidad se da seguimiento desde el primer contacto hasta la entrega, con control mediante hojas de trabajo compartidas.",
  },
  {
    title: "Visión de crecimiento",
    body: "El sitio web es la puerta de entrada. Después vienen automatizaciones, CRM, inteligencia artificial y productos propios.",
  },
];

export default function WhyNoddo() {
  return (
    <section id="por-que-noddo" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand">
            Por qué NODDO
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            No solo construimos sitios, construimos el camino hacia ellos
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {REASONS.map((r) => (
            <div key={r.title} className="flex gap-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />
              <div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
