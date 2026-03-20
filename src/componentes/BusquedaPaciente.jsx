export default function BusquedaPaciente({ busqueda, setBusqueda }) {
  return (
    <div className="tarjeta">
      <h2>Buscar paciente</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
}