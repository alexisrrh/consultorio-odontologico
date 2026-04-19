import { useEffect, useState } from "react";
import { obtenerMisCitas } from "../servicios/citas";
import { useAuth } from "../context/AuthContext";

function Miscitas() {
  const { usuario } = useAuth();
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

  if (loading) {
    return <p>Cargando citas...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mis citas</h2>

      {citas.length === 0 ? (
        <p>No tienes citas agendadas todavía.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {citas.map((cita) => (
            <div
              key={cita.id}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                padding: "16px",
                background: "rgba(255,255,255,0.8)",
              }}
            >
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Motivo:</strong> {cita.motivo || "Sin motivo"}</p>
              <p><strong>Estado:</strong> {cita.estado}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Miscitas;