"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createSession(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/plataforma/login");

  const { error } = await supabase.from("training_sessions").insert({
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    scheduled_at: new Date(formData.get("scheduled_at") as string).toISOString(),
    zoom_link: (formData.get("zoom_link") as string) || null,
    created_by: user.id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/plataforma/diego");
  redirect("/plataforma/diego");
}

export async function rescheduleSession(id: string, scheduledAtIso: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("training_sessions")
    .update({
      scheduled_at: scheduledAtIso,
      status: "programada",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/plataforma/diego/sesiones/${id}`);
  revalidatePath("/plataforma/diego");
  revalidatePath("/plataforma/capacitacion");
}

export async function setSessionRecording(id: string, recordingPath: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("training_sessions")
    .update({
      recording_url: recordingPath,
      status: "realizada",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/plataforma/diego/sesiones/${id}`);
  revalidatePath("/plataforma/capacitacion");
}

export async function markAttended(sessionId: string, advisorId: string, attended: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("session_attendance")
    .upsert(
      { session_id: sessionId, advisor_id: advisorId, attended },
      { onConflict: "session_id,advisor_id" }
    );

  if (error) throw new Error(error.message);

  revalidatePath(`/plataforma/diego/sesiones/${sessionId}`);
}
