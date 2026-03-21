import { useEffect, useState } from "react";
import Encabezado from "./componentes/Encabezado";
import FormularioPaciente from "./componentes/FormularioPaciente";
import BusquedaPaciente from "./componentes/BusquedaPaciente";
import ListaPacientes from "./componentes/ListaPacientes";
import FichaPaciente from "./componentes/FichaPaciente";
import "./App.css";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pacienteActivo, setPacienteActivo] = useState(null);

  useEffect(() => {
    const pacientesGuardados = localStorage.getItem("pacientes_odontologia");
    if (pacientesGuardados) {
      setPacientes(JSON.parse(pacientesGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pacientes_odontologia", JSON.stringify(pacientes));
  }, [pacientes]);

  const agregarPaciente = (nuevoPaciente) => {
    setPacientes((prev) => [nuevoPaciente, ...prev]);
  };

  const abrirFicha = (paciente) => {
    setPacienteActivo(paciente);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cerrarFicha = () => {
    setPacienteActivo(null);
  };

  const guardarFicha = (pacienteActualizado) => {
    const actualizados = pacientes.map((p) =>
      p.id === pacienteActualizado.id ? pacienteActualizado : p
    );
    setPacientes(actualizados);
    setPacienteActivo(pacienteActualizado);
  };

  const eliminarPaciente = (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este paciente?");
    if (!confirmar) return;

    const actualizados = pacientes.filter((p) => p.id !== id);
    setPacientes(actualizados);

    if (pacienteActivo?.id === id) {
      setPacienteActivo(null);
    }
  };

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const texto = busqueda.toLowerCase();
    return (
      paciente.nombre.toLowerCase().includes(texto) ||
      paciente.cedula.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="app">
      <Encabezado />

      {pacienteActivo ? (
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
              pacientes={pacientesFiltrados}
              alCompletarFicha={abrirFicha}
              alEliminar={eliminarPaciente}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;