import { supabase } from "./supabase";

export async function crearCita(cita) {
  const { data: existentes, error: errorBusqueda } = await supabase
    .from("citas")
    .select("*")
    .eq("medico_id", cita.medico_id)
    .eq("fecha", cita.fecha)
    .eq("hora", cita.hora);

  if (errorBusqueda) throw errorBusqueda;

  if (existentes.length > 0) {
    throw new Error("Esa hora ya está ocupada");
  }

  const { data, error } = await supabase
    .from("citas")
    .insert([cita])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function obtenerMisCitas(clienteId) {
  const { data, error } = await supabase
    .from("citas")
    .select(`
      *,
      paciente:paciente_id (
        id,
        nombre,
        cedula,
        telefono
      )
    `)
    .eq("cliente_id", clienteId)
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function obtenerCitasMedico(medicoId) {
  const { data, error } = await supabase
    .from("citas")
    .select(`
      *,
      paciente:paciente_id (
        id,
        nombre,
        cedula,
        telefono
      )
    `)
    .eq("medico_id", medicoId)
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function actualizarEstadoCita(citaId, nuevoEstado) {
  const { data, error } = await supabase
    .from("citas")
    .update({ estado: nuevoEstado })
    .eq("id", citaId)
    .select()
    .single();

  if (error) throw error;
  return data;
}