"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function confirmAttendance(sessionId: string, confirmed: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/plataforma/login");

  const { error } = await supabase.from("session_attendance").upsert(
    {
      session_id: sessionId,
      advisor_id: user.id,
      confirmed,
      confirmed_at: confirmed ? new Date().toISOString() : null,
    },
    { onConflict: "session_id,advisor_id" }
  );

  if (error) throw new Error(error.message);

  revalidatePath("/plataforma/capacitacion");
}
