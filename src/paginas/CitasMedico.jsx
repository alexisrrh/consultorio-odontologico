import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerCitasMedico,
  actualizarEstadoCita,
} from "../servicios/citas";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";

function CitasMedico() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [actualizandoId, setActualizandoId] = useState(null);

  useEffect(() => {
    async function cargarCitas() {
      if (!usuario) return;

      try {
        const data = await obtenerCitasMedico(usuario.id);
        setCitas(data);

        if (data.length > 0) {
          setFechaSeleccionada(data[0].fecha);
        }
      } catch (error) {
        console.error("Error cargando citas del médico:", error);
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
      navigate("/login-medico");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  const handleCambiarEstado = async (citaId, nuevoEstado) => {
    try {
      setActualizandoId(citaId);

      const actualizada = await actualizarEstadoCita(citaId, nuevoEstado);

      setCitas((prev) =>
        prev.map((cita) =>
          cita.id === citaId ? { ...cita, estado: actualizada.estado } : cita
        )
      );
    } catch (error) {
      console.error("Error actualizando estado:", error);
      alert(error.message || "No se pudo actualizar el estado");
    } finally {
      setActualizandoId(null);
    }
  };

  const fechasDisponibles = useMemo(() => {
    const unicas = [...new Set(citas.map((cita) => cita.fecha))];
    return unicas.sort();
  }, [citas]);

  const citasDelDia = useMemo(() => {
    if (!fechaSeleccionada) return [];
    return citas
      .filter((cita) => cita.fecha === fechaSeleccionada)
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }, [citas, fechaSeleccionada]);

  const resumenDelDia = useMemo(() => {
    const resumen = {
      total: citasDelDia.length,
      pendiente: 0,
      confirmada: 0,
      completada: 0,
      cancelada: 0,
    };

    citasDelDia.forEach((cita) => {
      if (resumen[cita.estado] !== undefined) {
        resumen[cita.estado] += 1;
      }
    });

    return resumen;
  }, [citasDelDia]);

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  const estiloEstado = (estado) => {
    switch (estado) {
      case "pendiente":
        return { backgroundColor: "#fef3c7", color: "#92400e" };
      case "confirmada":
        return { backgroundColor: "#dbeafe", color: "#1e40af" };
      case "completada":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "cancelada":
        return { backgroundColor: "#fee2e2", color: "#991b1b" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#374151" };
    }
  };

  const tarjetaResumenStyle = {
    borderRadius: "14px",
    padding: "16px",
    minWidth: "140px",
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(209,213,219,0.9)",
    backdropFilter: "blur(4px)",
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando agenda médica...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => navigate("/panel-clinico")}>
          Volver al panel clínico
        </button>

        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <h2 style={{ marginBottom: "20px" }}>Agenda médica</h2>

      {citas.length === 0 ? (
        <p>No tienes citas asignadas todavía.</p>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="fechaSeleccionada">
              <strong>Selecciona una fecha:</strong>
            </label>
            <br />
            <select
              id="fechaSeleccionada"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              style={{
                marginTop: "8px",
                padding: "10px",
                minWidth: "240px",
                borderRadius: "10px",
              }}
            >
              {fechasDisponibles.map((fecha) => (
                <option key={fecha} value={fecha}>
                  {formatearFecha(fecha)}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <div style={tarjetaResumenStyle}>
              <strong>Total</strong>
              <p style={{ fontSize: "24px", margin: "8px 0 0" }}>
                {resumenDelDia.total}
              </p>
            </div>

            <div style={tarjetaResumenStyle}>
              <strong>Pendientes</strong>
              <p style={{ fontSize: "24px", margin: "8px 0 0", color: "#92400e" }}>
                {resumenDelDia.pendiente}
              </p>
            </div>

            <div style={tarjetaResumenStyle}>
              <strong>Confirmadas</strong>
              <p style={{ fontSize: "24px", margin: "8px 0 0", color: "#1e40af" }}>
                {resumenDelDia.confirmada}
              </p>
            </div>

            <div style={tarjetaResumenStyle}>
              <strong>Completadas</strong>
              <p style={{ fontSize: "24px", margin: "8px 0 0", color: "#065f46" }}>
                {resumenDelDia.completada}
              </p>
            </div>

            <div style={tarjetaResumenStyle}>
              <strong>Canceladas</strong>
              <p style={{ fontSize: "24px", margin: "8px 0 0", color: "#991b1b" }}>
                {resumenDelDia.cancelada}
              </p>
            </div>
          </div>

          <h3 style={{ marginBottom: "16px" }}>
            Citas para el {formatearFecha(fechaSeleccionada)}
          </h3>

          {citasDelDia.length === 0 ? (
            <p>No hay citas para esta fecha.</p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {citasDelDia.map((cita) => (
                <div
                  key={cita.id}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "16px",
                    padding: "18px",
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
                        {cita.hora}
                      </p>
                      <p style={{ margin: "6px 0 0", fontSize: "18px" }}>
                        <strong>{cita.paciente?.nombre || "Paciente no disponible"}</strong>
                      </p>
                    </div>

                    <div>
                      <span
                        style={{
                          ...estiloEstado(cita.estado),
                          padding: "6px 12px",
                          borderRadius: "999px",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        {cita.estado}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "6px", marginBottom: "14px" }}>
                    <p style={{ margin: 0 }}>
                      <strong>Cédula:</strong>{" "}
                      {cita.paciente?.cedula || "No disponible"}
                    </p>

                    <p style={{ margin: 0 }}>
                      <strong>Teléfono:</strong>{" "}
                      {cita.paciente?.telefono || "No disponible"}
                    </p>

                    <p style={{ margin: 0 }}>
                      <strong>Motivo:</strong> {cita.motivo || "Sin motivo"}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <select
                      value={cita.estado}
                      onChange={(e) =>
                        handleCambiarEstado(cita.id, e.target.value)
                      }
                      disabled={actualizandoId === cita.id}
                      style={{ padding: "8px", borderRadius: "8px" }}
                    >
                      <option value="pendiente">pendiente</option>
                      <option value="confirmada">confirmada</option>
                      <option value="completada">completada</option>
                      <option value="cancelada">cancelada</option>
                    </select>

                    {cita.paciente?.id && (
                      <button
                        onClick={() => navigate(`/paciente/${cita.paciente.id}`)}
                      >
                        Abrir ficha
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CitasMedico;