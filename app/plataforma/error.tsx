"use client";

export default function PlataformaError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-lg font-semibold">Algo salió mal</h1>
      <p className="mt-2 text-sm text-muted">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Reintentar
      </button>
    </div>
  );
}
