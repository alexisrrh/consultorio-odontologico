import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerCitasMedico,
  actualizarEstadoCita,
} from "../servicios/citas";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";

function CitasMedico() {
  const { usuario, perfil } = useAuth();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [actualizandoId, setActualizandoId] = useState(null);

  const hoy = new Date();
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());

  useEffect(() => {
    async function cargarCitas() {
      if (!usuario) return;

      try {
        const data = await obtenerCitasMedico(usuario.id);
        setCitas(data);

        if (data.length > 0) {
          setFechaSeleccionada(data[0].fecha);
          const [year, month] = data[0].fecha.split("-");
          setAnioActual(Number(year));
          setMesActual(Number(month) - 1);
        } else {
          const fechaHoy = new Date();
          const year = fechaHoy.getFullYear();
          const month = String(fechaHoy.getMonth() + 1).padStart(2, "0");
          const day = String(fechaHoy.getDate()).padStart(2, "0");
          setFechaSeleccionada(`${year}-${month}-${day}`);
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

  const fechasConCitas = useMemo(() => {
    const mapa = {};
    citas.forEach((cita) => {
      mapa[cita.fecha] = (mapa[cita.fecha] || 0) + 1;
    });
    return mapa;
  }, [citas]);

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  const estiloEstadoChip = (estado) => {
    switch (estado) {
      case "pendiente":
        return {
          backgroundColor: "#fef3c7",
          color: "#92400e",
          border: "1px solid #fcd34d",
        };
      case "confirmada":
        return {
          backgroundColor: "#dbeafe",
          color: "#1e40af",
          border: "1px solid #93c5fd",
        };
      case "completada":
        return {
          backgroundColor: "#d1fae5",
          color: "#065f46",
          border: "1px solid #6ee7b7",
        };
      case "cancelada":
        return {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fca5a5",
        };
      default:
        return {
          backgroundColor: "#e5e7eb",
          color: "#374151",
          border: "1px solid #d1d5db",
        };
    }
  };

  const colorContadorResumen = (tipo) => {
    switch (tipo) {
      case "pendiente":
        return "#92400e";
      case "confirmada":
        return "#1e40af";
      case "completada":
        return "#065f46";
      case "cancelada":
        return "#991b1b";
      default:
        return "#111827";
    }
  };

  const tarjetaResumenStyle = {
    borderRadius: "16px",
    padding: "16px",
    minWidth: "150px",
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(209,213,219,0.95)",
    backdropFilter: "blur(4px)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  };

  const botonBase = {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const botonPrimario = {
    ...botonBase,
    backgroundColor: "#0f172a",
    color: "white",
  };

  const botonAzul = {
    ...botonBase,
    backgroundColor: "#2563eb",
    color: "white",
  };

  const botonVerde = {
    ...botonBase,
    backgroundColor: "#059669",
    color: "white",
  };

  const botonRojo = {
    ...botonBase,
    backgroundColor: "#dc2626",
    color: "white",
  };

  const botonClaro = {
    ...botonBase,
    backgroundColor: "#e5e7eb",
    color: "#111827",
  };

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const obtenerDiasDelCalendario = () => {
    const primerDiaMes = new Date(anioActual, mesActual, 1);
    const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);

    let diaInicio = primerDiaMes.getDay();
    if (diaInicio === 0) diaInicio = 7;

    const totalDias = ultimoDiaMes.getDate();
    const celdas = [];

    for (let i = 1; i < diaInicio; i++) {
      celdas.push(null);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      celdas.push(dia);
    }

    return celdas;
  };

  const cambiarMes = (direccion) => {
    if (direccion === "prev") {
      if (mesActual === 0) {
        setMesActual(11);
        setAnioActual((prev) => prev - 1);
      } else {
        setMesActual((prev) => prev - 1);
      }
    } else {
      if (mesActual === 11) {
        setMesActual(0);
        setAnioActual((prev) => prev + 1);
      } else {
        setMesActual((prev) => prev + 1);
      }
    }
  };

  const seleccionarDia = (dia) => {
    const fecha = `${anioActual}-${String(mesActual + 1).padStart(2, "0")}-${String(
      dia
    ).padStart(2, "0")}`;
    setFechaSeleccionada(fecha);
  };

  const celdasCalendario = obtenerDiasDelCalendario();

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando agenda médica...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Agenda médica</h2>
          <p style={{ margin: "6px 0 0", color: "#374151" }}>
            {perfil?.nombre || "Médico"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button style={botonClaro} onClick={() => navigate("/panel-clinico")}>
            Volver al panel clínico
          </button>

          <button style={botonRojo} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {citas.length === 0 ? (
        <p>No tienes citas asignadas todavía.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(320px, 390px) 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.82)",
              border: "1px solid #d1d5db",
              borderRadius: "20px",
              padding: "20px",
              backdropFilter: "blur(4px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <button style={botonClaro} onClick={() => cambiarMes("prev")}>
                ◀
              </button>
              <strong style={{ fontSize: "20px" }}>
                {meses[mesActual]} {anioActual}
              </strong>
              <button style={botonClaro} onClick={() => cambiarMes("next")}>
                ▶
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "8px",
                marginBottom: "12px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#1f2937",
              }}
            >
              {diasSemana.map((dia) => (
                <div key={dia}>{dia}</div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "10px",
              }}
            >
              {celdasCalendario.map((dia, index) => {
                if (!dia) {
                  return <div key={`empty-${index}`} />;
                }

                const fecha = `${anioActual}-${String(mesActual + 1).padStart(
                  2,
                  "0"
                )}-${String(dia).padStart(2, "0")}`;

                const esSeleccionada = fechaSeleccionada === fecha;
                const cantidadCitas = fechasConCitas[fecha] || 0;

                return (
                  <button
                    key={fecha}
                    onClick={() => seleccionarDia(dia)}
                    style={{
                      minHeight: "56px",
                      borderRadius: "14px",
                      border: esSeleccionada
                        ? "2px solid #2563eb"
                        : "1px solid #d1d5db",
                      background: esSeleccionada
                        ? "#dbeafe"
                        : "rgba(255,255,255,0.95)",
                      position: "relative",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "17px",
                      color: "#111827",
                    }}
                  >
                    {dia}
                    {cantidadCitas > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "6px",
                          right: "6px",
                          minWidth: "18px",
                          height: "18px",
                          borderRadius: "999px",
                          backgroundColor: "#0f766e",
                          color: "white",
                          fontSize: "11px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 5px",
                          fontWeight: "bold",
                        }}
                      >
                        {cantidadCitas}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
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
                <p style={{ fontSize: "28px", margin: "8px 0 0" }}>
                  {resumenDelDia.total}
                </p>
              </div>

              <div style={tarjetaResumenStyle}>
                <strong>Pendientes</strong>
                <p
                  style={{
                    fontSize: "28px",
                    margin: "8px 0 0",
                    color: colorContadorResumen("pendiente"),
                  }}
                >
                  {resumenDelDia.pendiente}
                </p>
              </div>

              <div style={tarjetaResumenStyle}>
                <strong>Confirmadas</strong>
                <p
                  style={{
                    fontSize: "28px",
                    margin: "8px 0 0",
                    color: colorContadorResumen("confirmada"),
                  }}
                >
                  {resumenDelDia.confirmada}
                </p>
              </div>

              <div style={tarjetaResumenStyle}>
                <strong>Completadas</strong>
                <p
                  style={{
                    fontSize: "28px",
                    margin: "8px 0 0",
                    color: colorContadorResumen("completada"),
                  }}
                >
                  {resumenDelDia.completada}
                </p>
              </div>

              <div style={tarjetaResumenStyle}>
                <strong>Canceladas</strong>
                <p
                  style={{
                    fontSize: "28px",
                    margin: "8px 0 0",
                    color: colorContadorResumen("cancelada"),
                  }}
                >
                  {resumenDelDia.cancelada}
                </p>
              </div>
            </div>

            <h3 style={{ marginBottom: "16px" }}>
              Citas para el {formatearFecha(fechaSeleccionada)}
            </h3>

            {citasDelDia.length === 0 ? (
              <div
                style={{
                  borderRadius: "16px",
                  padding: "20px",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid #d1d5db",
                }}
              >
                No hay citas para esta fecha.
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {citasDelDia.map((cita) => (
                  <div
                    key={cita.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "110px 1fr",
                      gap: "16px",
                      alignItems: "stretch",
                    }}
                  >
                    <div
                      style={{
                        borderLeft: "4px solid #0f766e",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.78)",
                        padding: "18px 14px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          color: "#0f172a",
                        }}
                      >
                        {cita.hora}
                      </span>
                    </div>

                    <div
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "18px",
                        padding: "18px",
                        background: "rgba(255,255,255,0.84)",
                        backdropFilter: "blur(4px)",
                        boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "12px",
                          flexWrap: "wrap",
                          marginBottom: "14px",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "#111827",
                            }}
                          >
                            {cita.paciente?.nombre || "Paciente no disponible"}
                          </p>
                        </div>

                        <span
                          style={{
                            ...estiloEstadoChip(cita.estado),
                            padding: "6px 12px",
                            borderRadius: "999px",
                            fontWeight: "bold",
                            display: "inline-block",
                            height: "fit-content",
                          }}
                        >
                          {cita.estado}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
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
  <button
    style={{
      ...(cita.estado === "confirmada" ? botonClaro : botonAzul),
      opacity: actualizandoId === cita.id ? 0.7 : 1,
    }}
    onClick={() => handleCambiarEstado(cita.id, "confirmada")}
    disabled={actualizandoId === cita.id || cita.estado === "confirmada"}
  >
    Confirmar
  </button>

  <button
    style={{
      ...(cita.estado === "completada" ? botonClaro : botonVerde),
      opacity: actualizandoId === cita.id ? 0.7 : 1,
    }}
    onClick={() => handleCambiarEstado(cita.id, "completada")}
    disabled={actualizandoId === cita.id || cita.estado === "completada"}
  >
    Completar
  </button>

  <button
    style={{
      ...(cita.estado === "cancelada" ? botonClaro : botonRojo),
      opacity: actualizandoId === cita.id ? 0.7 : 1,
    }}
    onClick={() => handleCambiarEstado(cita.id, "cancelada")}
    disabled={actualizandoId === cita.id || cita.estado === "cancelada"}
  >
    Cancelar
  </button>

  {cita.paciente?.id && (
    <button
      style={botonPrimario}
      onClick={() => navigate(`/paciente/${cita.paciente.id}`)}
    >
      Abrir ficha
    </button>
  )}
</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CitasMedico;