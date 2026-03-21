export default function ListaPacientes({ pacientes, alCompletarFicha, alEliminar }) {
  return (
    <div className="tarjeta">
      <h2>Pacientes registrados</h2>

      {pacientes.length === 0 ? (
        <p className="estado-vacio">No hay pacientes registrados.</p>
      ) : (
        <div className="lista-pacientes">
          {pacientes.map((paciente) => (
            <article className="paciente-item" key={paciente.id}>
              <h3>{paciente.nombre}</h3>
              <p><strong>Cédula:</strong> {paciente.cedula}</p>
              <p><strong>Teléfono:</strong> {paciente.telefono || "No registrado"}</p>

              <div className="acciones-paciente">
                <button onClick={() => alCompletarFicha(paciente)}>
                  Completar ficha
                </button>
                <button
                  className="boton-secundario"
                  onClick={() => alEliminar(paciente.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}