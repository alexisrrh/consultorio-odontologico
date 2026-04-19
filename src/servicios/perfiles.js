import { supabase } from "./supabase";

export async function obtenerPrimerMedico() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, nombre, rol")
    .eq("rol", "medico")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}