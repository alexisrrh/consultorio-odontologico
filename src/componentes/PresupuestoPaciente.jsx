import { useEffect, useMemo, useState } from "react";
import Odontograma from "./Odontograma";

export default function PresupuestoPaciente({ paciente, alCerrar, alGuardar }) {
  const [formulario, setFormulario] = useState(null);

  useEffect(() => {
    if (paciente) {
      setFormulario({
        ...paciente,
        presupuestoTotal: paciente.presupuestoTotal || 0,
        abonado: paciente.abonado || 0,
      });
    }
  }, [paciente]);

  const fecha = new Date().toLocaleDateString();

  const saldoPendiente = useMemo(() => {
    const total = Number(formulario?.presupuestoTotal || 0);
    const abonado = Number(formulario?.abonado || 0);
    return total - abonado;
  }, [formulario]);

  if (!paciente || !formulario) return null;

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarGuardar = () => {
    alGuardar({
      ...formulario,
      presupuestoTotal: Number(formulario.presupuestoTotal || 0),
      abonado: Number(formulario.abonado || 0),
    });
  };

  const dientesConNotas = (formulario.odontograma || []).filter((diente) =>
    ["caries", "conducto", "extraccion"].includes(diente.estado)
  );

  return (
    <div className="presupuesto-container">
      <div className="cabecera-ficha cabecera-ficha-completa">
        <div>
          <p className="etiqueta-superior">Presupuesto odontológico</p>
          <h1 className="titulo-ficha-completa">Propuesta de tratamiento</h1>
          <p className="subtexto-ficha">
            Documento de solo lectura con control económico del tratamiento.
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
          <p><strong>Nombre:</strong> {formulario.nombre || "-"}</p>
          <p><strong>Cédula:</strong> {formulario.cedula || "-"}</p>
          <p><strong>Teléfono:</strong> {formulario.telefono || "-"}</p>
          <p><strong>Correo:</strong> {formulario.email || "-"}</p>
          <p><strong>Dirección:</strong> {formulario.direccion || "-"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Motivo de consulta</h3>
          <p>{formulario.motivoConsulta || "No registrado"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Diagnóstico</h3>
          <p>{formulario.diagnostico || "Sin diagnóstico registrado"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Odontograma</h3>
          <p className="subtexto-ficha">
            Blanco: sano | Rojo: caries | Azul: conducto | Gris: extracción
          </p>

          <div className="odontograma-presupuesto-wrap">
            <Odontograma
              odontograma={formulario.odontograma || []}
              modo="lectura"
            />
          </div>
        </section>

        <section className="seccion-ficha">
          <h3>Observaciones clínicas</h3>
          <p>{formulario.observaciones || "Sin observaciones"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Tratamiento propuesto</h3>
          <p>{formulario.tratamiento || "No definido"}</p>
        </section>

        <section className="seccion-ficha">
          <h3>Notas por diente tratado</h3>

          {dientesConNotas.length === 0 ? (
            <p>No hay observaciones por dientes tratados.</p>
          ) : (
            <div className="grid-dos">
              {dientesConNotas.map((diente) => (
                <div key={diente.numero} className="bloque-nota-diente">
                  <label>
                    Diente {diente.numero} ({diente.estado})
                  </label>
                  <p>{diente.notas || "Sin observaciones"}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="seccion-ficha">
          <h3>Control económico</h3>

          <div className="grid-dos">
            <div>
              <label>Precio total</label>
              <input
                type="number"
                name="presupuestoTotal"
                value={formulario.presupuestoTotal}
                onChange={manejarCambio}
                placeholder="0"
              />
            </div>

            <div>
              <label>Abonado</label>
              <input
                type="number"
                name="abonado"
                value={formulario.abonado}
                onChange={manejarCambio}
                placeholder="0"
              />
            </div>
          </div>

          <div className="resultado-riesgo medio" style={{ marginTop: "16px" }}>
            <strong>Saldo pendiente: {saldoPendiente}</strong>
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

          <button type="button" className="boton-secundario" onClick={manejarGuardar}>
            Guardar presupuesto
          </button>

          <button type="button" onClick={() => window.print()}>
            Imprimir / Guardar PDF
          </button>
        </div>
      </div>
    </div>
  );
}