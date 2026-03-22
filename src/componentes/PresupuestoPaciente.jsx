import Odontograma from "./Odontograma";

export default function PresupuestoPaciente({ paciente, alCerrar }) {
  if (!paciente) return null;

  const fecha = new Date().toLocaleDateString();

  return (
    <div className="presupuesto-container">
      <div className="cabecera-ficha cabecera-ficha-completa">
        <div>
          <p className="etiqueta-superior">Presupuesto odontológico</p>
          <h1 className="titulo-ficha-completa">Propuesta de tratamiento</h1>
          <p className="subtexto-ficha">
            Documento de solo lectura para revisar diagnóstico, odontograma y
            tratamiento sugerido.
          </p>
        </div>

        <div className="acciones-cabecera">
          <button type="button" className="boton-secundario" onClick={alCerrar}>
            Volver
          </button>
        </div>
      </div>

      <div className="formulario-ficha formulario-ficha-completa">
        <section className="seccion-ficha">
          <h3>Datos del paciente</h3>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Nombre:</strong> {paciente.nombre || "-"}</p>
          <p><strong>Cédula:</strong> {paciente.cedula || "-"}</p>
          <p><strong>Teléfono:</strong> {paciente.telefono || "-"}</p>
          <p><strong>Correo:</strong> {paciente.email || "-"}</p>
          <p><strong>Dirección:</strong> {paciente.direccion || "-"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Motivo de consulta</h3>
          <p>{paciente.motivoConsulta || "No registrado"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Diagnóstico</h3>
          <p>{paciente.diagnostico || "Sin diagnóstico registrado"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Odontograma</h3>
          <p className="subtexto-ficha">
            Blanco: sano | Rojo: caries | Azul: conducto | Gris: extracción
          </p>

          <Odontograma
            odontograma={paciente.odontograma || []}
            modo="lectura"
          />
        </section>

        <section className="seccion-ficha">
          <h3>Observaciones clínicas</h3>
          <p>{paciente.observaciones || "Sin observaciones"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Tratamiento propuesto</h3>
          <p>{paciente.tratamiento || "No definido"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Notas por diente</h3>

          <div className="grid-dos">
            {(paciente.odontograma || []).map((diente) => (
              <div key={diente.numero} className="bloque-nota-diente">
                <label>Diente {diente.numero}</label>
                <p>{diente.notas || "Sin observaciones"}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="seccion-ficha">
          <h3>Condición del presupuesto</h3>
          <p>
            Este documento es una propuesta clínica basada en la evaluación
            actual del paciente y puede requerir ajustes según exámenes
            complementarios o evolución del tratamiento.
          </p>
        </section>

        <div className="barra-acciones-ficha">
          <button type="button" className="boton-secundario" onClick={alCerrar}>
            Volver
          </button>

          <button type="button" onClick={() => window.print()}>
            Imprimir / Guardar PDF
          </button>
        </div>
      </div>
    </div>
  );
}