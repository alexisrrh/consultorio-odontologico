import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMedico from "../componentes/NavbarMedico";
import { useAuth } from "../context/AuthContext";
import { obtenerCitasMedico } from "../servicios/citas";
import { obtenerPacientes } from "../servicios/api";

function DashboardMedico() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarDashboard() {
      if (!usuario) return;

      try {
        const [citasData, pacientesData] = await Promise.all([
          obtenerCitasMedico(usuario.id),
          obtenerPacientes(),
        ]);

        setCitas(citasData || []);
        setPacientes(pacientesData || []);
      } catch (error) {
        console.error("Error cargando dashboard médico:", error);
        alert(error.message || "No se pudo cargar el dashboard");
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

  const tarjetaStyle = {
    borderRadius: "18px",
    padding: "18px",
    background: "rgba(255,255,255,0.88)",
    border: "1px solid #d1d5db",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando dashboard médico...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <NavbarMedico />

      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ margin: 0 }}>Dashboard Médico</h2>
        <p style={{ margin: "6px 0 0", color: "#4b5563" }}>
          Bienvenido, {perfil?.nombre || "Doctor"}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={tarjetaStyle}>
          <strong>Pacientes registrados</strong>
          <p style={{ fontSize: "28px", margin: "10px 0 0" }}>
            {pacientes.length}
          </p>
        </div>

        <div style={tarjetaStyle}>
          <strong>Citas de hoy</strong>
          <p style={{ fontSize: "28px", margin: "10px 0 0" }}>
            {citasHoy.length}
          </p>
        </div>

        <div style={tarjetaStyle}>
          <strong>Pendientes hoy</strong>
          <p style={{ fontSize: "28px", margin: "10px 0 0", color: "#92400e" }}>
            {pendientesHoy}
          </p>
        </div>

        <div style={tarjetaStyle}>
          <strong>Confirmadas hoy</strong>
          <p style={{ fontSize: "28px", margin: "10px 0 0", color: "#1e40af" }}>
            {confirmadasHoy}
          </p>
        </div>

        <div style={tarjetaStyle}>
          <strong>Completadas hoy</strong>
          <p style={{ fontSize: "28px", margin: "10px 0 0", color: "#065f46" }}>
            {completadasHoy}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "20px",
        }}
      >
        <div style={tarjetaStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              alignItems: "center",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ margin: 0 }}>Próximas citas</h3>
            <button onClick={() => navigate("/citas-medico")}>
              Ver agenda completa
            </button>
          </div>

          {proximasCitas.length === 0 ? (
            <p>No hay citas registradas.</p>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {proximasCitas.map((cita) => (
                <div
                  key={cita.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    padding: "14px",
                    backgroundColor: "white",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {cita.fecha} - {cita.hora}
                  </p>
                  <p style={{ margin: "6px 0 0" }}>
                    <strong>Motivo:</strong> {cita.motivo || "Sin motivo"}
                  </p>
                  <p style={{ margin: "6px 0 0" }}>
                    <strong>Estado:</strong> {cita.estado}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={tarjetaStyle}>
          <h3 style={{ marginTop: 0 }}>Acciones rápidas</h3>

          <div style={{ display: "grid", gap: "12px" }}>
            <button onClick={() => navigate("/panel-clinico")}>
              Ir al panel clínico
            </button>

            <button onClick={() => navigate("/citas-medico")}>
              Ver agenda médica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMedico;