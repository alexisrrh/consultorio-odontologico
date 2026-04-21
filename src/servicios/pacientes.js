import { supabase } from "./supabase";

export async function obtenerPacientePorProfileId(profileId) {
  const { data, error } = await supabase
    .from("pacientes")
    .select("*")
    .eq("profile_id", profileId);

  if (error) throw error;

  return data?.[0] || null;
}

export async function crearPacienteParaUsuario(profileId, datosPaciente) {
  // Primero revisa si ya existe un paciente para este usuario
  const existente = await obtenerPacientePorProfileId(profileId);

  if (existente) {
    return existente;
  }

  const payload = {
    profile_id: profileId,
    nombre: datosPaciente.nombre || "",
    cedula: datosPaciente.cedula || "",
    telefono: datosPaciente.telefono || "",
    fecha_nacimiento: datosPaciente.fechaNacimiento || "",
    email: datosPaciente.email || "",
    direccion: datosPaciente.direccion || "",
    motivo_consulta: datosPaciente.motivoConsulta || "",
    antecedentes: datosPaciente.antecedentes || "",
    alergias: datosPaciente.alergias || "",
    observaciones: datosPaciente.observaciones || "",
    medicamentos: datosPaciente.medicamentos || "",
    enfermedades: datosPaciente.enfermedades || "",
    embarazo: datosPaciente.embarazo || false,
    tejidos: datosPaciente.tejidos || [],
    motivo_detalle: datosPaciente.motivoDetalle || [],
    habitos_clinicos: datosPaciente.habitosClinicos || [],
    enfermedades_clinicas: datosPaciente.enfermedadesClinicas || [],
    riesgo_caries: datosPaciente.riesgoCaries || {},
    odontograma: datosPaciente.odontograma || [],
    diagnostico: datosPaciente.diagnostico || "",
    tratamiento: datosPaciente.tratamiento || "",
    tejidos_otra: datosPaciente.tejidosOtra || "",
    motivo_detalle_otra: datosPaciente.motivoDetalleOtra || "",
    habitos_clinicos_otra: datosPaciente.habitosClinicosOtra || "",
    enfermedades_clinicas_otra: datosPaciente.enfermedadesClinicasOtra || "",
    presupuesto_total: Number(datosPaciente.presupuestoTotal || 0),
    abonado: Number(datosPaciente.abonado || 0),
  };

  const { data, error } = await supabase
    .from("pacientes")
    .insert([payload])
    .select();

  if (error) throw error;

  return data?.[0] || null;
}