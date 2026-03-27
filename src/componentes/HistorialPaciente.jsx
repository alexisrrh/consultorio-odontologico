import Odontograma from "./Odontograma";

export default function HistorialPaciente({ paciente, alCerrar }) {
  if (!paciente) return null;

  const tieneCariesEnAlgunaCara = (diente) => {
    return (
      diente.caras?.superior === "caries" ||
      diente.caras?.izquierda === "caries" ||
      diente.caras?.centro === "caries" ||
      diente.caras?.derecha === "caries" ||
      diente.caras?.inferior === "caries"
    );
  };

  const obtenerTipoTratamientoDiente = (diente) => {
    if (diente.tratamientoGeneral === "conducto") return "Conducto";
    if (diente.tratamientoGeneral === "extraccion") return "Extracción";
    if (tieneCariesEnAlgunaCara(diente)) return "Caries";
    return "Sano";
  };

  const dientesConNotas = (paciente.odontograma || []).filter(
    (diente) => diente.notas && diente.notas.trim() !== ""
  );

  const dientesTratados = (paciente.odontograma || []).filter((diente) => {
    return (
      diente.tratamientoGeneral === "conducto" ||
      diente.tratamientoGeneral === "extraccion" ||
      tieneCariesEnAlgunaCara(diente)
    );
  });

  return (
    <div className="ficha-pantalla-completa">
      <div className="cabecera-ficha cabecera-ficha-completa">
        <div>
          <p className="etiqueta-superior">Historial clínico</p>
          <h1 className="titulo-ficha-completa">Expediente del paciente</h1>
          <p className="subtexto-ficha">
            Vista de solo lectura del historial guardado.
          </p>
        </div>

        <div className="acciones-cabecera">
          <button type="button" className="boton-principal" onClick={alCerrar}>
            Volver
          </button>
        </div>
      </div>

      <div className="formulario-ficha formulario-ficha-completa">
        <section className="seccion-ficha">
          <h3>Datos personales</h3>
          <p><strong>Nombre:</strong> {paciente.nombre || "-"}</p>
          <p><strong>Cédula:</strong> {paciente.cedula || "-"}</p>
          <p><strong>Teléfono:</strong> {paciente.telefono || "-"}</p>
          <p><strong>Fecha de nacimiento:</strong> {paciente.fechaNacimiento || "-"}</p>
          <p><strong>Email:</strong> {paciente.email || "-"}</p>
          <p><strong>Dirección:</strong> {paciente.direccion || "-"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Antecedentes médicos</h3>
          <p><strong>Antecedentes:</strong> {paciente.antecedentes || "-"}</p>
          <p><strong>Alergias:</strong> {paciente.alergias || "-"}</p>
          <p><strong>Medicamentos:</strong> {paciente.medicamentos || "-"}</p>
          <p><strong>Enfermedades:</strong> {paciente.enfermedades || "-"}</p>
          <p><strong>Embarazo:</strong> {paciente.embarazo ? "Sí" : "No"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Consulta odontológica</h3>
          <p><strong>Motivo de consulta:</strong> {paciente.motivoConsulta || "-"}</p>
          <p><strong>Observaciones:</strong> {paciente.observaciones || "-"}</p>
          <p><strong>Diagnóstico:</strong> {paciente.diagnostico || "-"}</p>
          <p><strong>Tratamiento:</strong> {paciente.tratamiento || "-"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Riesgo de caries</h3>
          <p><strong>Nivel:</strong> {paciente.riesgoCaries?.nivel || "-"}</p>
          <p><strong>Puntaje:</strong> {paciente.riesgoCaries?.puntaje ?? "-"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Resumen de dientes tratados</h3>

          {dientesTratados.length === 0 ? (
            <p>No hay dientes tratados registrados.</p>
          ) : (
            <div className="grid-dos">
              {dientesTratados.map((diente) => (
                <div key={diente.numero} className="bloque-nota-diente">
                  <label>
                    Diente {diente.numero} - {obtenerTipoTratamientoDiente(diente)}
                  </label>
                  <p>
                    {tieneCariesEnAlgunaCara(diente) && diente.tratamientoGeneral !== "conducto" && diente.tratamientoGeneral !== "extraccion"
                      ? `Caras afectadas: ${[
                          diente.caras?.superior === "caries" ? "superior" : null,
                          diente.caras?.izquierda === "caries" ? "izquierda" : null,
                          diente.caras?.centro === "caries" ? "centro" : null,
                          diente.caras?.derecha === "caries" ? "derecha" : null,
                          diente.caras?.inferior === "caries" ? "inferior" : null,
                        ]
                          .filter(Boolean)
                          .join(", ")}`
                      : "Tratamiento general aplicado"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="seccion-ficha">
          <h3>Odontograma</h3>
          <Odontograma
            odontograma={paciente.odontograma || []}
            alCambiarDiente={() => {}}
            tratamientoActivo=""
            modoImpresion={true}
          />
        </section>

        <section className="seccion-ficha">
          <h3>Notas por diente</h3>

          {dientesConNotas.length === 0 ? (
            <p>Sin observaciones registradas.</p>
          ) : (
            <div className="grid-dos">
              {dientesConNotas.map((diente) => (
                <div key={diente.numero} className="bloque-nota-diente">
                  <label>
                    Diente {diente.numero} - {obtenerTipoTratamientoDiente(diente)}
                  </label>
                  <p>{diente.notas}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}