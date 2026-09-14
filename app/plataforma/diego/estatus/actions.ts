"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addStatus(formData: FormData) {
  const supabase = await createClient();
  const label = formData.get("label") as string;

  const { data: last } = await supabase
    .from("client_statuses")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("client_statuses")
    .insert({ label, sort_order: (last?.sort_order ?? 0) + 1 });

  if (error) throw new Error(error.message);

  revalidatePath("/plataforma/diego/estatus");
}

export async function deleteStatus(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("client_statuses").delete().eq("id", id);

  if (error) {
    throw new Error(
      "No se pudo eliminar: probablemente hay prospectos usando este estatus."
    );
  }

  revalidatePath("/plataforma/diego/estatus");
}
