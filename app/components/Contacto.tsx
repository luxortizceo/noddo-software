"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contacto() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="text-white">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
              Contacto
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Cuéntanos qué necesita tu negocio
            </p>
            <p className="mt-4 max-w-md text-white/70">
              Deja tus datos y un miembro de nuestro equipo de Sales se pondrá
              en contacto para agendar una reunión y preparar tu propuesta.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="text-sm font-medium text-foreground">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="negocio" className="text-sm font-medium text-foreground">
                  Negocio
                </label>
                <input
                  id="negocio"
                  name="negocio"
                  required
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="text-sm font-medium text-foreground">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
                  ¿Qué necesita tu negocio?
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-brand"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar"}
            </button>

            {status === "sent" && (
              <p className="mt-4 text-sm font-medium text-green-600">
                ¡Gracias! Te contactaremos pronto.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-medium text-red-600">
                Algo salió mal. Intenta de nuevo en unos minutos.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
