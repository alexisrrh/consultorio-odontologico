import { useEffect, useState } from "react";
import Encabezado from "./componentes/Encabezado";
import FormularioPaciente from "./componentes/FormularioPaciente";
import BusquedaPaciente from "./componentes/BusquedaPaciente";
import ListaPacientes from "./componentes/ListaPacientes";
import FichaPaciente from "./componentes/FichaPaciente";
import HistorialPaciente from "./componentes/HistorialPaciente";
import PresupuestoPaciente from "./componentes/PresupuestoPaciente";
import {
  obtenerPacientes,
  buscarPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente as eliminarPacienteDB,
} from "./servicios/api";
import "./App.css";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pacienteActivo, setPacienteActivo] = useState(null);
  const [pacienteHistorial, setPacienteHistorial] = useState(null);
  const [pacientePresupuesto, setPacientePresupuesto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPacientes();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      ejecutarBusqueda();
    }, 300);

    return () => clearTimeout(delay);
  }, [busqueda]);

  async function cargarPacientes() {
    try {
      setCargando(true);
      const data = await obtenerPacientes();
      setPacientes(data);
    } catch (error) {
      console.error("Error cargando pacientes:", error);
      alert("No se pudieron cargar los pacientes");
    } finally {
      setCargando(false);
    }
  }

  async function ejecutarBusqueda() {
    try {
      setCargando(true);
      const data = await buscarPacientes(busqueda);
      setPacientes(data);
    } catch (error) {
      console.error("Error buscando pacientes:", error);
      alert("No se pudo realizar la búsqueda");
    } finally {
      setCargando(false);
    }
  }

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

      {cargando ? (
        <main className="contenedor-principal">
          <section className="tarjeta">
            <h2>Cargando pacientes...</h2>
          </section>
        </main>
      ) : pacientePresupuesto ? (
        <main className="contenedor-ficha-completa">
          <PresupuestoPaciente
            paciente={pacientePresupuesto}
            alCerrar={cerrarPresupuesto}
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

          <section className="columna derecha">
            <BusquedaPaciente busqueda={busqueda} setBusqueda={setBusqueda} />
            <ListaPacientes
              pacientes={pacientes}
              alCompletarFicha={abrirFicha}
              alVerHistorial={abrirHistorial}
              alVerPresupuesto={abrirPresupuesto}
              alEliminar={eliminarPaciente}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;