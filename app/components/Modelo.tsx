const STEPS = [
  {
    n: "01",
    title: "Sales detecta la oportunidad",
    body: "Nuestro equipo comercial se acerca a negocios en León, Irapuato y Salamanca, apoyado en una base de más de 30,000 prospectos, y entiende qué necesitan.",
  },
  {
    n: "02",
    title: "NODDO prepara la propuesta",
    body: "Analizamos el negocio y armamos una propuesta a la medida: qué solución tiene sentido y cuánto cuesta construirla.",
  },
  {
    n: "03",
    title: "Producción desarrolla la solución",
    body: "El equipo técnico construye la plataforma: desde un sitio corporativo hasta e-commerce, reservaciones o paneles administrativos.",
  },
  {
    n: "04",
    title: "El cliente recibe su plataforma",
    body: "El negocio recibe una solución lista para usarse, con acompañamiento durante todo el proceso de negociación y entrega.",
  },
];

export default function Modelo() {
  return (
    <section id="modelo" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand">
            Cómo funciona NODDO
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Sales genera la oportunidad. Producción construye la solución.
          </p>
          <p className="mt-4 text-muted">
            Un vendedor no necesita saber programar, y un desarrollador no
            necesita salir a conseguir clientes. NODDO es la estructura que
            conecta ambos lados.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.n} className="relative rounded-2xl border border-border bg-background p-6">
              <span className="text-sm font-bold text-brand">{step.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-2xl text-border lg:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
