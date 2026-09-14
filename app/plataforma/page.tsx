import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/profile";

export default async function PlataformaHomePage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/plataforma/login");
  }

  redirect(profile.role === "diego" ? "/plataforma/diego" : "/plataforma/asesor");
}
