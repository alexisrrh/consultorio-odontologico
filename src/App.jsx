import { useState } from "react";
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
    alert("Ficha actualizada");
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
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;