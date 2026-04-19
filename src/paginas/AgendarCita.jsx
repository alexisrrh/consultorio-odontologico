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
      navigate("/login-cliente");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
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
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <form onSubmit={handleSubmit}>
        <h2>Agendar Cita</h2>

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
            <h3>Completa tus datos para crear tu ficha</h3>

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
          onChange={(e) => setFecha(e.target.value)}
        />

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

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