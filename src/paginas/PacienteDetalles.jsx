import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FichaPaciente from "../componentes/FichaPaciente";
import { actualizarPaciente, obtenerPacientes } from "../servicios/api";

function PacienteDetalles() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarPaciente() {
      try {
        const pacientes = await obtenerPacientes();
        const encontrado = pacientes.find((p) => p.id === id);

        if (!encontrado) {
          alert("Paciente no encontrado");
          navigate("/citas-medico");
          return;
        }

        setPaciente(encontrado);
      } catch (error) {
        console.error("Error cargando paciente:", error);
        alert(error.message || "No se pudo cargar el paciente");
      } finally {
        setLoading(false);
      }
    }

    cargarPaciente();
  }, [id, navigate]);

  const guardarFicha = async (pacienteActualizado) => {
    try {
      const actualizado = await actualizarPaciente(pacienteActualizado);
      setPaciente(actualizado);
      alert("Ficha guardada correctamente");
    } catch (error) {
      console.error("Error guardando ficha:", error);
      alert(error.message || "No se pudo guardar la ficha");
    }
  };

  if (loading) {
    return <p>Cargando ficha del paciente...</p>;
  }

  if (!paciente) {
    return <p>No se encontró el paciente.</p>;
  }

  return (
    <main className="contenedor-ficha-completa">
      <button onClick={() => navigate("/citas-medico")}>
        Volver a citas
      </button>

      <FichaPaciente
        paciente={paciente}
        alCerrar={() => navigate("/citas-medico")}
        alGuardar={guardarFicha}
      />
    </main>
  );
}

export default PacienteDetalles;