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

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div>
      <h2>Mis citas</h2>

      {citas.length === 0 ? (
        <p>No tienes citas agendadas todavía.</p>
      ) : (
        <div>
          {citas.map((cita) => (
            <div
              key={cita.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Motivo:</strong> {cita.motivo || "Sin motivo"}</p>
              <p><strong>Estado:</strong> {cita.estado}</p>
              <p><strong>Médico ID:</strong> {cita.medico_id}</p>
              <p><strong>Paciente ID:</strong> {cita.paciente_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Miscitas;