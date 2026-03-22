import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function obtenerPacientes() {
  const { data, error } = await supabase
    .from("pacientes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapPacienteDesdeDB);
}

export async function buscarPacientes(texto) {
  const termino = texto.trim();

  if (!termino) {
    return await obtenerPacientes();
  }

  const { data, error } = await supabase
    .from("pacientes")
    .select("*")
    .or(`nombre.ilike.%${termino}%,cedula.ilike.%${termino}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map(mapPacienteDesdeDB);
}

export async function crearPaciente(paciente) {
  const payload = mapPacienteHaciaDB(paciente);

  const { data, error } = await supabase
    .from("pacientes")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return mapPacienteDesdeDB(data);
}

export async function actualizarPaciente(paciente) {
  const payload = mapPacienteHaciaDB(paciente);

  const { data, error } = await supabase
    .from("pacientes")
    .update(payload)
    .eq("id", paciente.id)
    .select()
    .single();

  if (error) throw error;
  return mapPacienteDesdeDB(data);
}

export async function eliminarPaciente(id) {
  const { error } = await supabase
    .from("pacientes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

function mapPacienteHaciaDB(paciente) {
  return {
    nombre: paciente.nombre || "",
    cedula: paciente.cedula || "",
    telefono: paciente.telefono || "",
    fecha_nacimiento: paciente.fechaNacimiento || "",
    email: paciente.email || "",
    direccion: paciente.direccion || "",

    motivo_consulta: paciente.motivoConsulta || "",
    antecedentes: paciente.antecedentes || "",
    alergias: paciente.alergias || "",
    observaciones: paciente.observaciones || "",

    medicamentos: paciente.medicamentos || "",
    enfermedades: paciente.enfermedades || "",
    embarazo: paciente.embarazo || false,

    tejidos: paciente.tejidos || [],
    motivo_detalle: paciente.motivoDetalle || [],
    habitos_clinicos: paciente.habitosClinicos || [],
    enfermedades_clinicas: paciente.enfermedadesClinicas || [],
    riesgo_caries: paciente.riesgoCaries || {},
    odontograma: paciente.odontograma || [],

    diagnostico: paciente.diagnostico || "",
    tratamiento: paciente.tratamiento || "",

    tejidos_otra: paciente.tejidosOtra || "",
    motivo_detalle_otra: paciente.motivoDetalleOtra || "",
    habitos_clinicos_otra: paciente.habitosClinicosOtra || "",
    enfermedades_clinicas_otra: paciente.enfermedadesClinicasOtra || "",

    presupuesto_total: Number(paciente.presupuestoTotal || 0),
    abonado: Number(paciente.abonado || 0),
  };
}

function mapPacienteDesdeDB(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    cedula: row.cedula,
    telefono: row.telefono,
    fechaNacimiento: row.fecha_nacimiento,
    email: row.email,
    direccion: row.direccion,

    motivoConsulta: row.motivo_consulta,
    antecedentes: row.antecedentes,
    alergias: row.alergias,
    observaciones: row.observaciones,

    medicamentos: row.medicamentos,
    enfermedades: row.enfermedades,
    embarazo: row.embarazo,

    tejidos: row.tejidos || [],
    motivoDetalle: row.motivo_detalle || [],
    habitosClinicos: row.habitos_clinicos || [],
    enfermedadesClinicas: row.enfermedades_clinicas || [],
    riesgoCaries: row.riesgo_caries || {},
    odontograma: row.odontograma || [],

    diagnostico: row.diagnostico,
    tratamiento: row.tratamiento,

    tejidosOtra: row.tejidos_otra || "",
    motivoDetalleOtra: row.motivo_detalle_otra || "",
    habitosClinicosOtra: row.habitos_clinicos_otra || "",
    enfermedadesClinicasOtra: row.enfermedades_clinicas_otra || "",

    presupuestoTotal: row.presupuesto_total || 0,
    abonado: row.abonado || 0,
  };
}