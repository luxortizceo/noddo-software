"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProspect(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/plataforma/login");

  const { error } = await supabase.from("prospects").insert({
    advisor_id: user.id,
    business_name: formData.get("business_name") as string,
    contact_name: (formData.get("contact_name") as string) || null,
    phone: (formData.get("phone") as string) || null,
    email: (formData.get("email") as string) || null,
    notes: (formData.get("notes") as string) || null,
    status_id: formData.get("status_id") as string,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/plataforma/asesor");
  redirect("/plataforma/asesor");
}

export async function updateProspect(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("prospects")
    .update({
      business_name: formData.get("business_name") as string,
      contact_name: (formData.get("contact_name") as string) || null,
      phone: (formData.get("phone") as string) || null,
      email: (formData.get("email") as string) || null,
      notes: (formData.get("notes") as string) || null,
      status_id: formData.get("status_id") as string,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/plataforma/asesor");
  redirect("/plataforma/asesor");
}

export async function updateProspectStatus(id: string, statusId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("prospects")
    .update({ status_id: statusId, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/plataforma/asesor");
}
