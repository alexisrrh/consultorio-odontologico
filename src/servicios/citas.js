import { supabase } from "./supabase";

function horaPermitida(hora) {
  if (!hora) return false;

  const [horas, minutos] = hora.split(":").map(Number);
  const totalMinutos = horas * 60 + minutos;

  const inicioManana = 8 * 60;
  const finManana = 12 * 60;
  const inicioTarde = 14 * 60;
  const finTarde = 17 * 60;

  const enManana = totalMinutos >= inicioManana && totalMinutos <= finManana;
  const enTarde = totalMinutos >= inicioTarde && totalMinutos <= finTarde;

  return enManana || enTarde;
}

export async function crearCita(cita) {
  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);

  const fechaSeleccionada = new Date(cita.fecha);

  if (fechaSeleccionada < fechaHoy) {
    throw new Error("No puedes agendar citas en fechas pasadas");
  }

  if (!horaPermitida(cita.hora)) {
    throw new Error(
      "La hora no está permitida. Solo se atiende de 08:00 a 12:00 y de 14:00 a 17:00"
    );
  }

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