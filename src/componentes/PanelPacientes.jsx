import { useEffect, useState } from "react";
import BusquedaPaciente from "./BusquedaPaciente";
import ListaPacientes from "./ListaPacientes";
import { buscarPacientes, obtenerPacientes } from "../servicios/api";

export default function PanelPacientes({
  alCompletarFicha,
  alVerHistorial,
  alVerPresupuesto,
  alEliminar,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(true);

  useEffect(() => {
    cargarPacientesIniciales();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      ejecutarBusqueda();
    }, 300);

    return () => clearTimeout(delay);
  }, [busqueda]);

  async function cargarPacientesIniciales() {
    try {
      setCargandoBusqueda(true);
      const data = await obtenerPacientes();
      setPacientes(data);
    } catch (error) {
      console.error("Error cargando pacientes:", error);
      alert("No se pudieron cargar los pacientes");
    } finally {
      setCargandoBusqueda(false);
    }
  }

  async function ejecutarBusqueda() {
    try {
      setCargandoBusqueda(true);
      const data = await buscarPacientes(busqueda);
      setPacientes(data);
    } catch (error) {
      console.error("Error buscando pacientes:", error);
      alert("No se pudo realizar la búsqueda");
    } finally {
      setCargandoBusqueda(false);
    }
  }

  return (
    <section className="columna derecha">
      <BusquedaPaciente busqueda={busqueda} setBusqueda={setBusqueda} />

      {cargandoBusqueda ? (
        <div className="tarjeta">
          <h2>Cargando pacientes...</h2>
        </div>
      ) : (
        <ListaPacientes
          pacientes={pacientes}
          alCompletarFicha={alCompletarFicha}
          alVerHistorial={alVerHistorial}
          alVerPresupuesto={alVerPresupuesto}
          alEliminar={alEliminar}
        />
      )}
    </section>
  );
}