export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          <span className="font-semibold text-white">NODDO</span> Software —
          Website as a Service
        </p>
        <p className="text-xs">
          © {year} NODDO Software. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
