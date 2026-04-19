import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMisCitas } from "../servicios/citas";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";

function Miscitas() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarCitas() {
      if (!usuario) return;

      try {
        const data = await obtenerMisCitas(usuario.id);
        setCitas(data);
      } catch (error) {
        console.error("Error cargando mis citas:", error);
        alert(error.message || "No se pudieron cargar las citas");
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

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando citas...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Mis citas</h2>
          <p style={{ margin: "6px 0 0", color: "#4b5563" }}>
            {perfil?.nombre || "Cliente"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => navigate("/")}>Inicio</button>
          <button onClick={() => navigate("/agendar-cita")}>Agendar cita</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      {citas.length === 0 ? (
        <p>No tienes citas agendadas todavía.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {citas.map((cita) => (
            <div
              key={cita.id}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "14px",
                padding: "16px",
                background: "rgba(255,255,255,0.84)",
              }}
            >
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Motivo:</strong> {cita.motivo || "Sin motivo"}</p>
              <p><strong>Estado:</strong> {cita.estado}</p>
              {cita.paciente?.nombre && (
                <p><strong>Paciente:</strong> {cita.paciente.nombre}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Miscitas;