const SERVICIOS = [
  {
    title: "Sitios corporativos",
    body: "Presencia profesional para tu negocio: quiénes son, qué ofrecen y cómo contactarlos, optimizada para convertir visitas en clientes.",
  },
  {
    title: "E-commerce",
    body: "Tiendas en línea con catálogo, carrito y pagos, listas para vender sin depender de terceros.",
  },
  {
    title: "Sistemas de reservaciones",
    body: "Agenda y disponibilidad en tiempo real para negocios de servicios, restaurantes o consultorios.",
  },
  {
    title: "Catálogos digitales",
    body: "Muestra tus productos o servicios de forma clara, con búsqueda y filtros, sin necesidad de un e-commerce completo.",
  },
  {
    title: "Paneles administrativos",
    body: "Herramientas internas para que el negocio gestione pedidos, inventario o clientes desde un solo lugar.",
  },
  {
    title: "Automatizaciones y CRM",
    body: "El siguiente paso más allá del sitio web: seguimiento de clientes, flujos automáticos e integraciones a la medida.",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand">
            Soluciones que desarrollamos
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Cada negocio necesita algo distinto
          </p>
          <p className="mt-4 text-muted">
            No partimos de una plantilla: partimos de lo que tu negocio
            necesita resolver.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border p-6 transition-colors hover:border-brand/40"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
