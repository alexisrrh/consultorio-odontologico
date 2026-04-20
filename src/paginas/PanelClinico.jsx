import { useEffect, useState } from "react";
import NavbarMedico from "../componentes/NavbarMedico";
import FormularioPaciente from "../componentes/FormularioPaciente";
import FichaPaciente from "../componentes/FichaPaciente";
import HistorialPaciente from "../componentes/HistorialPaciente";
import PresupuestoPaciente from "../componentes/PresupuestoPaciente";
import PanelPacientes from "../componentes/PanelPacientes";
import logoClinica from "../assets/logo-clinica.png";
import {
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente as eliminarPacienteDB,
  obtenerPacientes,
} from "../servicios/api";

function PanelClinico() {
  const [pacientes, setPacientes] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [pacienteHistorial, setPacienteHistorial] = useState(null);
  const [pacientePresupuesto, setPacientePresupuesto] = useState(null);

  useEffect(() => {
    async function cargarPacientes() {
      try {
        setErrorMsg("");
        const data = await obtenerPacientes();
        setPacientes(data || []);
      } catch (error) {
        console.error("Error cargando pacientes:", error);
        setErrorMsg(error.message || "No se pudieron cargar los pacientes");
      } finally {
        setLoadingPacientes(false);
      }
    }

    cargarPacientes();
  }, []);

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

  const mostrandoVistaDetalle =
    pacientePresupuesto || pacienteHistorial || pacienteActivo;

  return (
    <div className="app panel-clinico-page">
      <NavbarMedico />

      {!mostrandoVistaDetalle && (
        <div className="panel-clinico-wrapper">
          <header className="panel-clinico-header">
            <div className="panel-clinico-brand">
              <img
                src={logoClinica}
                alt="Logo clínica"
                className="panel-clinico-logo"
              />
              <div>
                <p className="panel-clinico-badge">Panel clínico</p>
                <h1>Gestión de pacientes</h1>
                <p className="panel-clinico-subtexto">
                  Registra pacientes, completa fichas clínicas, consulta
                  historiales y genera presupuestos desde un solo lugar.
                </p>
              </div>
            </div>
          </header>

          {errorMsg && (
            <div className="panel-clinico-error">
              <h3>Ocurrió un problema</h3>
              <p>{errorMsg}</p>
            </div>
          )}
        </div>
      )}

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
        <main className="contenedor-principal panel-clinico-main">
          <section className="columna izquierda">
            <div className="panel-clinico-bloque">
              <FormularioPaciente alGuardar={agregarPaciente} />
            </div>
          </section>

          <div className="panel-clinico-bloque">
            <PanelPacientes
              pacientes={pacientes}
              loading={loadingPacientes}
              alCompletarFicha={abrirFicha}
              alVerHistorial={abrirHistorial}
              alVerPresupuesto={abrirPresupuesto}
              alEliminar={eliminarPaciente}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default PanelClinico;