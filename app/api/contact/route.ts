import { NextResponse } from "next/server";

type ContactPayload = {
  nombre?: string;
  negocio?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
};

export async function POST(request: Request) {
  const body: ContactPayload = await request.json();

  if (!body.nombre || !body.negocio || !body.telefono || !body.email) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  // TODO: conectar a un destino real (correo, Google Sheets o CRM).
  // Por ahora solo se registra en el log del servidor.
  console.log("Nuevo lead de NODDO:", body);

  return NextResponse.json({ ok: true });
}
