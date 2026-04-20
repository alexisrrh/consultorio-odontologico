import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMisCitas } from "../servicios/citas";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";
import logoClinica from "../assets/logo-clinica.png";

function Miscitas() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function cargarCitas() {
      if (!usuario) return;

      try {
        setErrorMsg("");

        const data = await obtenerMisCitas(usuario.id);
        setCitas(data || []);
      } catch (error) {
        console.error("Error cargando mis citas:", error);
        setErrorMsg(error.message || "No se pudieron cargar las citas");
      } finally {
        setLoading(false);
      }
    }

    cargarCitas();
  }, [usuario]);

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";

    const fechaObj = new Date(fecha);
    if (Number.isNaN(fechaObj.getTime())) return fecha;

    return fechaObj.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="mis-citas-page">
        <div className="mis-citas-wrapper">
          <div className="mis-citas-empty">
            <h3>Cargando citas...</h3>
            <p>Espera un momento mientras preparamos tu información.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-citas-page">
      <div className="mis-citas-wrapper">
        <header className="mis-citas-header">
          <div className="mis-citas-brand">
            <img
              src={logoClinica}
              alt="Logo clínica"
              className="mis-citas-logo"
            />
            <div>
              <p className="mis-citas-badge">Área del paciente</p>
              <h1>Mis citas</h1>
              <p className="mis-citas-subtexto">
                {perfil?.nombre || "Cliente"} — consulta aquí tus citas
                registradas y mantén tu seguimiento organizado.
              </p>
            </div>
          </div>

          <div className="mis-citas-actions">
            <button className="btn-secundario" onClick={() => navigate("/")}>
              Inicio
            </button>

            <button
              className="btn-principal"
              onClick={() => navigate("/agendar-cita")}
            >
              Agendar cita
            </button>

            <button className="btn-secundario" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        {errorMsg ? (
          <div className="mis-citas-empty error">
            <h3>Ocurrió un problema</h3>
            <p>{errorMsg}</p>
          </div>
        ) : citas.length === 0 ? (
          <div className="mis-citas-empty">
            <h3>No tienes citas agendadas todavía</h3>
            <p>
              Cuando registres una cita, aparecerá aquí con sus detalles.
            </p>
            <button
              className="btn-principal"
              onClick={() => navigate("/agendar-cita")}
            >
              Agendar mi primera cita
            </button>
          </div>
        ) : (
          <section className="mis-citas-grid">
            {citas.map((cita) => (
              <article key={cita.id} className="cita-card">
                <div className="cita-card-top">
                  <div>
                    <p className="cita-label">Fecha</p>
                    <h3>{formatearFecha(cita.fecha)}</h3>
                  </div>

                  <span className={`estado-cita ${cita.estado || "pendiente"}`}>
                    {cita.estado || "pendiente"}
                  </span>
                </div>

                <div className="cita-info-grid">
                  <div className="cita-info-item">
                    <span>Hora</span>
                    <strong>{cita.hora || "-"}</strong>
                  </div>

                  <div className="cita-info-item">
                    <span>Paciente</span>
                    <strong>{cita.paciente?.nombre || perfil?.nombre || "-"}</strong>
                  </div>

                  <div className="cita-info-item full">
                    <span>Motivo</span>
                    <strong>{cita.motivo || "Sin motivo"}</strong>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default Miscitas;