import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCita } from "../servicios/citas";
import { obtenerPrimerMedico } from "../servicios/perfiles";
import {
  obtenerPacientePorProfileId,
  crearPacienteParaUsuario,
} from "../servicios/pacientes";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";

function AgendarCita() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");

  const [medico, setMedico] = useState(null);
  const [paciente, setPaciente] = useState(null);

  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");

  const [guardando, setGuardando] = useState(false);
  const [loadingDatos, setLoadingDatos] = useState(true);

  const hoy = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function cargarDatos() {
      if (!usuario || !perfil) return;

      try {
        const medicoEncontrado = await obtenerPrimerMedico();
        const pacienteEncontrado = await obtenerPacientePorProfileId(usuario.id);

        setMedico(medicoEncontrado || null);
        setPaciente(pacienteEncontrado || null);

        if (pacienteEncontrado) {
          setNombre(pacienteEncontrado.nombre || "");
          setCedula(pacienteEncontrado.cedula || "");
          setTelefono(pacienteEncontrado.telefono || "");
        } else {
          setNombre(perfil?.nombre || usuario?.user_metadata?.nombre || "");
        }
      } catch (error) {
        console.error("Error cargando datos para la cita:", error);
        alert(error.message || "No se pudieron cargar los datos");
      } finally {
        setLoadingDatos(false);
      }
    }

    cargarDatos();
  }, [usuario, perfil]);

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  const horaPermitida = (horaTexto) => {
    if (!horaTexto) return false;

    const [horas, minutos] = horaTexto.split(":").map(Number);
    const totalMinutos = horas * 60 + minutos;

    const inicioManana = 8 * 60;
    const finManana = 13 * 60;
    const inicioTarde = 14 * 60;
    const finTarde = 17 * 60;

    const enManana = totalMinutos >= inicioManana && totalMinutos <= finManana;
    const enTarde = totalMinutos >= inicioTarde && totalMinutos <= finTarde;

    return enManana || enTarde;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("No hay usuario autenticado");
      return;
    }

    if (!medico) {
      alert("No hay médico disponible");
      return;
    }

    if (!fecha || !hora) {
      alert("Debes seleccionar fecha y hora");
      return;
    }

    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(fecha);

    if (fechaSeleccionada < fechaHoy) {
      alert("No puedes seleccionar fechas pasadas");
      return;
    }

    if (!horaPermitida(hora)) {
      alert("Solo se atiende de 08:00 a 12:00 y de 14:00 a 17:00");
      return;
    }

    try {
      setGuardando(true);

      let pacienteFinal = paciente;

      if (!pacienteFinal) {
        if (!nombre.trim() || !cedula.trim() || !telefono.trim()) {
          alert("Debes completar nombre, cédula y teléfono");
          return;
        }

        pacienteFinal = await crearPacienteParaUsuario(usuario.id, {
          nombre: nombre.trim(),
          cedula: cedula.trim(),
          telefono: telefono.trim(),
          email: usuario.email || "",
        });

        setPaciente(pacienteFinal);
      }

      await crearCita({
        cliente_id: usuario.id,
        medico_id: medico.id,
        paciente_id: pacienteFinal.id,
        fecha,
        hora,
        motivo,
        estado: "pendiente",
      });

      alert("Cita creada correctamente");
      setFecha("");
      setHora("");
      setMotivo("");
    } catch (error) {
      console.error("Error creando cita:", error);
      alert(error.message || "Error creando cita");
    } finally {
      setGuardando(false);
    }
  };

  if (loadingDatos) {
    return <p style={{ padding: "20px" }}>Cargando datos...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2>Agendar Cita</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "12px", maxWidth: "420px" }}
      >
        <p>
          <strong>Médico asignado:</strong>{" "}
          {medico ? medico.nombre : "No disponible"}
        </p>

        {paciente ? (
          <p>
            <strong>Paciente asociado:</strong> {paciente.nombre}
          </p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input
              type="text"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </>
        )}

        <input
          type="date"
          value={fecha}
          min={hoy}
          onChange={(e) => setFecha(e.target.value)}
        />

        <input
          type="time"
          value={hora}
          min="08:00"
          max="17:00"
          step="1800"
          onChange={(e) => setHora(e.target.value)}
        />

        <small style={{ color: "#555" }}>
          Horario disponible: 08:00 a 12:00 y 14:00 a 17:00
        </small>

        <input
          type="text"
          placeholder="Motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar cita"}
        </button>
      </form>
    </div>
  );
}

export default AgendarCita;