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
import logoClinica from "../assets/logo-clinica.png";

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
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");

  const hoy = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function cargarDatos() {
      if (!usuario || !perfil) return;

      try {
        setErrorMsg("");
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
        setErrorMsg(error.message || "No se pudieron cargar los datos");
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
      setErrorMsg("No se pudo cerrar sesión");
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
    setErrorMsg("");
    setMensajeOk("");

    if (!usuario) {
      setErrorMsg("No hay usuario autenticado");
      return;
    }

    if (!medico) {
      setErrorMsg("No hay médico disponible");
      return;
    }

    if (!fecha || !hora) {
      setErrorMsg("Debes seleccionar fecha y hora");
      return;
    }

    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(fecha);

    if (fechaSeleccionada < fechaHoy) {
      setErrorMsg("No puedes seleccionar fechas pasadas");
      return;
    }

    if (!horaPermitida(hora)) {
      setErrorMsg("Solo se atiende de 08:00 a 12:00 y de 14:00 a 17:00");
      return;
    }

    try {
      setGuardando(true);

      let pacienteFinal = paciente;

      if (!pacienteFinal) {
        if (!nombre.trim() || !cedula.trim() || !telefono.trim()) {
          setErrorMsg("Debes completar nombre, cédula y teléfono");
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

      setMensajeOk("Cita creada correctamente");
      setFecha("");
      setHora("");
      setMotivo("");
    } catch (error) {
      console.error("Error creando cita:", error);
      setErrorMsg(error.message || "Error creando cita");
    } finally {
      setGuardando(false);
    }
  };

  if (loadingDatos) {
    return (
      <div className="agendar-page">
        <div className="agendar-wrapper">
          <div className="agendar-empty">
            <h3>Cargando datos...</h3>
            <p>Espera un momento mientras preparamos el formulario.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agendar-page">
      <div className="agendar-wrapper">
        <header className="agendar-header">
          <div className="agendar-brand">
            <img
              src={logoClinica}
              alt="Logo clínica"
              className="agendar-logo"
            />
            <div>
              <p className="agendar-badge">Área del paciente</p>
              <h1>Agendar cita</h1>
              <p className="agendar-subtexto">
                Reserva tu cita de forma rápida y organizada con el médico
                disponible.
              </p>
            </div>
          </div>

          <div className="agendar-actions">
            <button className="btn-secundario" onClick={() => navigate("/")}>
              Inicio
            </button>
            <button className="btn-secundario" onClick={() => navigate("/mis-citas")}>
              Mis citas
            </button>
            <button className="btn-principal" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="agendar-layout">
          <section className="agendar-info-card">
            <h3>Información de la cita</h3>

            <div className="agendar-info-bloque">
              <span>Médico asignado</span>
              <strong>{medico ? medico.nombre : "No disponible"}</strong>
            </div>

            <div className="agendar-info-bloque">
              <span>Paciente</span>
              <strong>
                {paciente?.nombre || nombre || perfil?.nombre || "Sin nombre"}
              </strong>
            </div>

            <div className="agendar-info-bloque">
              <span>Horario disponible</span>
              <strong>08:00 am a 5:00 pm </strong>
            </div>

            <div className="agendar-ayuda">
              <p>
                Selecciona una fecha válida, una hora dentro del horario
                disponible y añade el motivo de tu consulta.
              </p>
            </div>
          </section>

          <section className="agendar-form-card">
            <form onSubmit={handleSubmit} className="agendar-form">
              {!paciente ? (
                <>
                  <div className="agendar-input-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Nombre completo"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="agendar-input-group">
                    <label htmlFor="cedula">Cédula</label>
                    <input
                      id="cedula"
                      type="text"
                      placeholder="Cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                    />
                  </div>

                  <div className="agendar-input-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      id="telefono"
                      type="text"
                      placeholder="Teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="agendar-paciente-asociado">
                  <span>Paciente asociado</span>
                  <strong>{paciente.nombre}</strong>
                </div>
              )}

              <div className="agendar-input-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  id="fecha"
                  type="date"
                  value={fecha}
                  min={hoy}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div className="agendar-input-group">
                <label htmlFor="hora">Hora</label>
                <input
                  id="hora"
                  type="time"
                  value={hora}
                  min="08:00"
                  max="17:00"
                  step="1800"
                  onChange={(e) => setHora(e.target.value)}
                />
                <small className="agendar-horario-help">
                  Horario disponible: 08:00 a 12:00 y 14:00 a 17:00
                </small>
              </div>

              <div className="agendar-input-group">
                <label htmlFor="motivo">Motivo de la consulta</label>
                <input
                  id="motivo"
                  type="text"
                  placeholder="Motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
              </div>

              {errorMsg && <p className="login-error">{errorMsg}</p>}
              {mensajeOk && <p className="login-success">{mensajeOk}</p>}

              <button type="submit" className="login-btn" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar cita"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AgendarCita;