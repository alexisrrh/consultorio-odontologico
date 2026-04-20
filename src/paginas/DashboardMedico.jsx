import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMedico from "../componentes/NavbarMedico";
import { useAuth } from "../context/AuthContext";
import { obtenerCitasMedico } from "../servicios/citas";
import { obtenerPacientes } from "../servicios/api";
import logoClinica from "../assets/logo-clinica.png";

function DashboardMedico() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function cargarDashboard() {
      if (!usuario) return;

      try {
        setErrorMsg("");

        const [citasData, pacientesData] = await Promise.all([
          obtenerCitasMedico(usuario.id),
          obtenerPacientes(),
        ]);

        setCitas(citasData || []);
        setPacientes(pacientesData || []);
      } catch (error) {
        console.error("Error cargando dashboard médico:", error);
        setErrorMsg(error.message || "No se pudo cargar el dashboard");
      } finally {
        setLoading(false);
      }
    }

    cargarDashboard();
  }, [usuario]);

  const fechaHoy = useMemo(() => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0");
    const day = String(hoy.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const citasHoy = useMemo(
    () => citas.filter((cita) => cita.fecha === fechaHoy),
    [citas, fechaHoy]
  );

  const pendientesHoy = useMemo(
    () => citasHoy.filter((cita) => cita.estado === "pendiente").length,
    [citasHoy]
  );

  const confirmadasHoy = useMemo(
    () => citasHoy.filter((cita) => cita.estado === "confirmada").length,
    [citasHoy]
  );

  const completadasHoy = useMemo(
    () => citasHoy.filter((cita) => cita.estado === "completada").length,
    [citasHoy]
  );

  const proximasCitas = useMemo(() => {
    return [...citas]
      .sort((a, b) => {
        const fechaA = `${a.fecha} ${a.hora}`;
        const fechaB = `${b.fecha} ${b.hora}`;
        return fechaA.localeCompare(fechaB);
      })
      .slice(0, 5);
  }, [citas]);

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
      <div className="dashboard-medico-page">
        <NavbarMedico />
        <div className="dashboard-medico-wrapper">
          <div className="dashboard-empty">
            <h3>Cargando dashboard médico...</h3>
            <p>Espera un momento mientras preparamos la información.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-medico-page">
      <NavbarMedico />

      <div className="dashboard-medico-wrapper">
        <header className="dashboard-header">
          <div className="dashboard-brand">
            <img
              src={logoClinica}
              alt="Logo clínica"
              className="dashboard-logo"
            />
            <div>
              <p className="dashboard-badge">Panel médico</p>
              <h1>Dashboard Médico</h1>
              <p className="dashboard-subtexto">
                Bienvenido, {perfil?.nombre || "Doctor"}. Aquí puedes consultar
                tus citas, pacientes y accesos rápidos del sistema.
              </p>
            </div>
          </div>
        </header>

        {errorMsg ? (
          <div className="dashboard-empty error">
            <h3>Ocurrió un problema</h3>
            <p>{errorMsg}</p>
          </div>
        ) : (
          <>
            <section className="dashboard-stats-grid">
              <article className="dashboard-stat-card">
                <span className="dashboard-stat-label">Pacientes registrados</span>
                <strong>{pacientes.length}</strong>
              </article>

              <article className="dashboard-stat-card">
                <span className="dashboard-stat-label">Citas de hoy</span>
                <strong>{citasHoy.length}</strong>
              </article>

              <article className="dashboard-stat-card">
                <span className="dashboard-stat-label">Pendientes hoy</span>
                <strong className="estado-texto pendiente">{pendientesHoy}</strong>
              </article>

              <article className="dashboard-stat-card">
                <span className="dashboard-stat-label">Confirmadas hoy</span>
                <strong className="estado-texto confirmada">{confirmadasHoy}</strong>
              </article>

              <article className="dashboard-stat-card">
                <span className="dashboard-stat-label">Completadas hoy</span>
                <strong className="estado-texto completada">{completadasHoy}</strong>
              </article>
            </section>

            <section className="dashboard-layout">
              <div className="dashboard-panel">
                <div className="dashboard-panel-header">
                  <div>
                    <h3>Próximas citas</h3>
                    <p>Resumen rápido de las siguientes citas registradas.</p>
                  </div>

                  <button
                    className="btn-principal"
                    onClick={() => navigate("/citas-medico")}
                  >
                    Ver agenda completa
                  </button>
                </div>

                {proximasCitas.length === 0 ? (
                  <div className="dashboard-empty small">
                    <h3>No hay citas registradas</h3>
                    <p>Cuando se registren nuevas citas aparecerán aquí.</p>
                  </div>
                ) : (
                  <div className="dashboard-citas-lista">
                    {proximasCitas.map((cita) => (
                      <article key={cita.id} className="dashboard-cita-card">
                        <div className="dashboard-cita-top">
                          <div>
                            <p className="dashboard-cita-label">Fecha</p>
                            <h4>{formatearFecha(cita.fecha)}</h4>
                          </div>

                          <span className={`estado-cita ${cita.estado || "pendiente"}`}>
                            {cita.estado || "pendiente"}
                          </span>
                        </div>

                        <div className="dashboard-cita-grid">
                          <div className="dashboard-cita-item">
                            <span>Hora</span>
                            <strong>{cita.hora || "-"}</strong>
                          </div>

                          <div className="dashboard-cita-item full">
                            <span>Motivo</span>
                            <strong>{cita.motivo || "Sin motivo"}</strong>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              <aside className="dashboard-panel dashboard-panel-lateral">
                <h3>Acciones rápidas</h3>
                <p className="dashboard-panel-texto">
                  Accede rápidamente a las secciones principales del panel.
                </p>

                <div className="dashboard-acciones-grid">
                  <button
                    className="btn-principal"
                    onClick={() => navigate("/panel-clinico")}
                  >
                    Ir al panel clínico
                  </button>

                  <button
                    className="btn-secundario"
                    onClick={() => navigate("/citas-medico")}
                  >
                    Ver agenda médica
                  </button>
                </div>
              </aside>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardMedico;