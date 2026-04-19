import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import FormularioPaciente from "../componentes/FormularioPaciente";
import FichaPaciente from "../componentes/FichaPaciente";
import HistorialPaciente from "../componentes/HistorialPaciente";
import PresupuestoPaciente from "../componentes/PresupuestoPaciente";
import PanelPacientes from "../componentes/PanelPacientes";
import { cerrarSesion } from "../servicios/auth";
import {
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente as eliminarPacienteDB,
  obtenerPacientes,
} from "../servicios/api";

function PanelClinico() {
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);

  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [pacienteHistorial, setPacienteHistorial] = useState(null);
  const [pacientePresupuesto, setPacientePresupuesto] = useState(null);

  useEffect(() => {
    async function cargarPacientes() {
      try {
        const data = await obtenerPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error cargando pacientes:", error);
        alert(error.message || "No se pudieron cargar los pacientes");
      } finally {
        setLoadingPacientes(false);
      }
    }

    cargarPacientes();
  }, []);

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/login-medico");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  const abrirFicha = (paciente) => {
    setPacienteActivo(paciente);
    setPacienteHistorial(null);
    setPacientePresupuesto(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cerrarFicha = () => {
    setPacienteActivo(null);
  };

  const abrirHistorial = (paciente) => {
    setPacienteHistorial(paciente);
    setPacienteActivo(null);
    setPacientePresupuesto(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cerrarHistorial = () => {
    setPacienteHistorial(null);
  };

  const abrirPresupuesto = (paciente) => {
    setPacientePresupuesto(paciente);
    setPacienteActivo(null);
    setPacienteHistorial(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cerrarPresupuesto = () => {
    setPacientePresupuesto(null);
  };

  const agregarPaciente = async (nuevoPaciente) => {
    try {
      const creado = await crearPaciente(nuevoPaciente);
      setPacientes((prev) => [creado, ...prev]);
      alert("Paciente guardado correctamente");
    } catch (error) {
      console.error("Error creando paciente:", error);
      alert(error.message || "No se pudo registrar el paciente");
    }
  };

  const guardarFicha = async (pacienteActualizado) => {
    try {
      const actualizado = await actualizarPaciente(pacienteActualizado);

      setPacientes((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );

      setPacienteActivo(actualizado);
      alert("Ficha guardada correctamente");
    } catch (error) {
      console.error("Error guardando ficha:", error);
      alert(error.message || "No se pudo guardar la ficha");
    }
  };

  const guardarPresupuesto = async (pacienteActualizado) => {
    try {
      const actualizado = await actualizarPaciente(pacienteActualizado);

      setPacientes((prev) =>
        prev.map((p) => (p.id === actualizado.id ? actualizado : p))
      );

      setPacientePresupuesto(actualizado);
      alert("Presupuesto guardado correctamente");
    } catch (error) {
      console.error("Error guardando presupuesto:", error);
      alert(error.message || "No se pudo guardar el presupuesto");
    }
  };

  const eliminarPaciente = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este paciente?");
    if (!confirmar) return;

    try {
      await eliminarPacienteDB(id);

      setPacientes((prev) => prev.filter((p) => p.id !== id));

      if (pacienteActivo?.id === id) setPacienteActivo(null);
      if (pacienteHistorial?.id === id) setPacienteHistorial(null);
      if (pacientePresupuesto?.id === id) setPacientePresupuesto(null);
    } catch (error) {
      console.error("Error eliminando paciente:", error);
      alert(error.message || "No se pudo eliminar el paciente");
    }
  };

  return (
    <div className="app">
      <Encabezado />

      <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
      

        <button onClick={() => navigate("/citas-medico")}>
          Ver citas
        </button>

      </div>

      {pacientePresupuesto ? (
        <main className="contenedor-ficha-completa">
          <PresupuestoPaciente
            paciente={pacientePresupuesto}
            alCerrar={cerrarPresupuesto}
            alGuardar={guardarPresupuesto}
          />
        </main>
      ) : pacienteHistorial ? (
        <main className="contenedor-ficha-completa">
          <HistorialPaciente
            paciente={pacienteHistorial}
            alCerrar={cerrarHistorial}
          />
        </main>
      ) : pacienteActivo ? (
        <main className="contenedor-ficha-completa">
          <FichaPaciente
            paciente={pacienteActivo}
            alCerrar={cerrarFicha}
            alGuardar={guardarFicha}
          />
        </main>
      ) : (
        <main className="contenedor-principal">
          <section className="columna izquierda">
            <FormularioPaciente alGuardar={agregarPaciente} />
          </section>

          <PanelPacientes
            pacientes={pacientes}
            loading={loadingPacientes}
            alCompletarFicha={abrirFicha}
            alVerHistorial={abrirHistorial}
            alVerPresupuesto={abrirPresupuesto}
            alEliminar={eliminarPaciente}
          />
        </main>
      )}
    </div>
  );
}

export default PanelClinico;