import { useEffect, useState } from "react";
import Odontograma from "./Odontograma";

const preguntasRiesgo = [
  { key: "cepillado", label: "Se cepilla menos de 2 veces al día", puntos: 2 },
  { key: "azucar", label: "Consume azúcar frecuentemente", puntos: 2 },
  { key: "dolor", label: "Presenta dolor dental", puntos: 2 },
  { key: "manchas", label: "Tiene manchas o cavidades visibles", puntos: 3 },
  { key: "historial", label: "Ha tenido caries anteriormente", puntos: 3 },
  { key: "bocaSeca", label: "Sufre de boca seca", puntos: 2 },
  { key: "sinDentista", label: "No visita al dentista regularmente", puntos: 1 },
];

const opcionesTejidos = [
  "Liso",
  "Rugoso",
  "Pálido",
  "Enrojecimiento",
  "No representa ninguna de las anteriores",
];

const opcionesMotivoConsulta = [
  "Emergencia",
  "Dolor",
  "Caries",
  "Prótesis",
  "Extracción",
  "No representa ninguna de las anteriores",
];

const opcionesHabitos = [
  "Contracciones musculares",
  "Hábitos de mordida",
  "Respiración bucal",
  "Chupadores de labios",
  "Lengua",
  "Dedos",
  "Bruxismo",
  "Onicofagia",
  "No representa ninguna de las anteriores",
];

const opcionesEnfermedadesActuales = [
  "Sistema cardiovascular",
  "Sistema nervioso",
  "Sistema respiratorio",
  "Propensión hemorrágica",
  "Pruebas de laboratorio",
  "Estudio radiológico",
  "Renal",
  "Aparato digestivo",
  "Diabetes",
  "Artritis",
  "Estado general",
  "No representa ninguna de las anteriores",
];

export default function FichaPaciente({ paciente, alCerrar, alGuardar }) {
  const [formulario, setFormulario] = useState(null);
  const [tratamientoActivo, setTratamientoActivo] = useState("sano");

  useEffect(() => {
    if (paciente) {
      setFormulario({
        ...paciente,
        tejidosOtra: paciente.tejidosOtra || "",
        motivoDetalleOtra: paciente.motivoDetalleOtra || "",
        habitosClinicosOtra: paciente.habitosClinicosOtra || "",
        enfermedadesClinicasOtra: paciente.enfermedadesClinicasOtra || "",
        odontograma: (paciente.odontograma || []).map((diente) => ({
          ...diente,
          tratamientoGeneral: diente.tratamientoGeneral || "sano",
          caras: {
            superior: diente.caras?.superior || "sano",
            izquierda: diente.caras?.izquierda || "sano",
            centro: diente.caras?.centro || "sano",
            derecha: diente.caras?.derecha || "sano",
            inferior: diente.caras?.inferior || "sano",
          },
          notas: diente.notas || "",
        })),
      });
    }
  }, [paciente]);

  if (!paciente || !formulario) return null;

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarCheckboxLista = (campo, item, marcado) => {
    setFormulario((prev) => {
      const listaActual = prev[campo] || [];
      const nuevaLista = marcado
        ? [...listaActual, item]
        : listaActual.filter((i) => i !== item);

      return {
        ...prev,
        [campo]: nuevaLista,
      };
    });
  };

  const manejarRespuestaRiesgo = (key, checked) => {
    setFormulario((prev) => ({
      ...prev,
      riesgoCaries: {
        ...prev.riesgoCaries,
        respuestas: {
          ...(prev.riesgoCaries?.respuestas || {}),
          [key]: checked,
        },
      },
    }));
  };

  const evaluarRiesgo = () => {
    let puntaje = 0;

    preguntasRiesgo.forEach((pregunta) => {
      if (formulario.riesgoCaries?.respuestas?.[pregunta.key]) {
        puntaje += pregunta.puntos;
      }
    });

    let nivel = "Bajo";
    if (puntaje >= 5 && puntaje < 10) nivel = "Medio";
    if (puntaje >= 10) nivel = "Alto";

    setFormulario((prev) => ({
      ...prev,
      riesgoCaries: {
        ...prev.riesgoCaries,
        puntaje,
        nivel,
      },
    }));
  };

  const cambiarEstadoDiente = (numero, dienteActualizado) => {
    setFormulario((prev) => ({
      ...prev,
      odontograma: (prev.odontograma || []).map((diente) =>
        diente.numero === numero ? dienteActualizado : diente
      ),
    }));
  };

  const manejarNotasDiente = (numero, texto) => {
    setFormulario((prev) => ({
      ...prev,
      odontograma: (prev.odontograma || []).map((diente) =>
        diente.numero === numero
          ? { ...diente, notas: texto }
          : diente
      ),
    }));
  };

  const tieneCariesEnAlgunaCara = (diente) => {
    return (
      diente.caras?.superior === "caries" ||
      diente.caras?.izquierda === "caries" ||
      diente.caras?.derecha === "caries" ||
      diente.caras?.inferior === "caries" ||
      diente.caras?.centro === "caries"
    );
  };

  const dientesConNotas = (formulario.odontograma || []).filter((diente) => {
    return (
      diente.tratamientoGeneral === "conducto" ||
      diente.tratamientoGeneral === "extraccion" ||
      tieneCariesEnAlgunaCara(diente)
    );
  });

  const obtenerTipoTratamientoDiente = (diente) => {
    if (diente.tratamientoGeneral === "conducto") return "conducto";
    if (diente.tratamientoGeneral === "extraccion") return "extraccion";
    if (tieneCariesEnAlgunaCara(diente)) return "caries";
    return "sano";
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    alGuardar(formulario);
  };

  return (
    <div className="ficha-pantalla-completa">
      <div className="cabecera-ficha cabecera-ficha-completa">
        <div>
          <p className="etiqueta-superior">Historia clínica odontológica</p>
          <h1 className="titulo-ficha-completa">Ficha del paciente</h1>
          <p className="subtexto-ficha">
            Completa y actualiza la información clínica del paciente.
          </p>
        </div>

        <div className="acciones-cabecera">
          <button type="button" className="boton-secundario" onClick={alCerrar}>
            Volver
          </button>
        </div>
      </div>

      <form
        className="formulario-ficha formulario-ficha-completa"
        onSubmit={manejarEnvio}
      >
        <section className="seccion-ficha">
          <h3>Datos personales</h3>

          <div className="grid-dos">
            <input
              type="text"
              name="nombre"
              value={formulario.nombre || ""}
              onChange={manejarCambio}
              placeholder="Nombre completo"
            />

            <input
              type="text"
              name="cedula"
              value={formulario.cedula || ""}
              onChange={manejarCambio}
              placeholder="Cédula"
            />
          </div>

          <div className="grid-tres">
            <input
              type="text"
              name="telefono"
              value={formulario.telefono || ""}
              onChange={manejarCambio}
              placeholder="Teléfono"
            />

            <input
              type="date"
              name="fechaNacimiento"
              value={formulario.fechaNacimiento || ""}
              onChange={manejarCambio}
            />

            <input
              type="email"
              name="email"
              value={formulario.email || ""}
              onChange={manejarCambio}
              placeholder="Correo"
            />
          </div>

          <input
            type="text"
            name="direccion"
            value={formulario.direccion || ""}
            onChange={manejarCambio}
            placeholder="Dirección"
          />
        </section>

        <section className="seccion-ficha">
          <h3>Antecedentes médicos</h3>

          <textarea
            name="antecedentes"
            value={formulario.antecedentes || ""}
            onChange={manejarCambio}
            placeholder="Antecedentes médicos"
          />

          <textarea
            name="alergias"
            value={formulario.alergias || ""}
            onChange={manejarCambio}
            placeholder="Alergias"
          />

          <textarea
            name="medicamentos"
            value={formulario.medicamentos || ""}
            onChange={manejarCambio}
            placeholder="Medicamentos actuales"
          />

          <textarea
            name="enfermedades"
            value={formulario.enfermedades || ""}
            onChange={manejarCambio}
            placeholder="Enfermedades o antecedentes relevantes"
          />

          <div className="grupo-checkbox">
            <label>
              <input
                type="checkbox"
                checked={formulario.embarazo || false}
                onChange={(e) =>
                  setFormulario((prev) => ({
                    ...prev,
                    embarazo: e.target.checked,
                  }))
                }
              />
              Embarazo
            </label>
          </div>
        </section>

        <section className="seccion-ficha">
          <h3>Examen clínico</h3>

          <div className="bloque-opciones">
            <strong>Tejidos</strong>
            <div className="grupo-checkbox">
              {opcionesTejidos.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={formulario.tejidos?.includes(item) || false}
                    onChange={(e) =>
                      manejarCheckboxLista("tejidos", item, e.target.checked)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>

            <input
              type="text"
              name="tejidosOtra"
              value={formulario.tejidosOtra || ""}
              onChange={manejarCambio}
              placeholder="Otra opción de tejidos"
            />
          </div>

          <div className="bloque-opciones">
            <strong>Motivo de consulta</strong>
            <div className="grupo-checkbox">
              {opcionesMotivoConsulta.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={formulario.motivoDetalle?.includes(item) || false}
                    onChange={(e) =>
                      manejarCheckboxLista(
                        "motivoDetalle",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              ))}
            </div>

            <input
              type="text"
              name="motivoDetalleOtra"
              value={formulario.motivoDetalleOtra || ""}
              onChange={manejarCambio}
              placeholder="Otra opción de motivo de consulta"
            />
          </div>

          <div className="bloque-opciones">
            <strong>Hábitos</strong>
            <div className="grupo-checkbox">
              {opcionesHabitos.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={formulario.habitosClinicos?.includes(item) || false}
                    onChange={(e) =>
                      manejarCheckboxLista(
                        "habitosClinicos",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              ))}
            </div>

            <input
              type="text"
              name="habitosClinicosOtra"
              value={formulario.habitosClinicosOtra || ""}
              onChange={manejarCambio}
              placeholder="Otro hábito"
            />
          </div>

          <div className="bloque-opciones">
            <strong>Enfermedades actuales</strong>
            <div className="grupo-checkbox">
              {opcionesEnfermedadesActuales.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={
                      formulario.enfermedadesClinicas?.includes(item) || false
                    }
                    onChange={(e) =>
                      manejarCheckboxLista(
                        "enfermedadesClinicas",
                        item,
                        e.target.checked
                      )
                    }
                  />
                  {item}
                </label>
              ))}
            </div>

            <input
              type="text"
              name="enfermedadesClinicasOtra"
              value={formulario.enfermedadesClinicasOtra || ""}
              onChange={manejarCambio}
              placeholder="Otra enfermedad actual"
            />
          </div>
        </section>

        <section className="seccion-ficha">
          <h3>Evaluación de riesgo de caries</h3>

          <div className="lista-riesgo">
            {preguntasRiesgo.map((pregunta) => (
              <label key={pregunta.key} className="item-riesgo">
                <input
                  type="checkbox"
                  checked={
                    formulario.riesgoCaries?.respuestas?.[pregunta.key] || false
                  }
                  onChange={(e) =>
                    manejarRespuestaRiesgo(pregunta.key, e.target.checked)
                  }
                />
                <span>{pregunta.label}</span>
              </label>
            ))}
          </div>

          <div className="acciones-riesgo">
            <button type="button" onClick={evaluarRiesgo}>
              Evaluar riesgo
            </button>
          </div>

          {formulario.riesgoCaries?.nivel && (
            <div
              className={`resultado-riesgo ${formulario.riesgoCaries.nivel.toLowerCase()}`}
            >
              <strong>Riesgo: {formulario.riesgoCaries.nivel}</strong>
              <p>Puntaje: {formulario.riesgoCaries.puntaje}</p>
              <p>
                Este resultado es orientativo y no sustituye la evaluación
                clínica odontológica.
              </p>
            </div>
          )}

          {formulario.riesgoCaries?.nivel === "Bajo" && (
            <p className="mensaje-riesgo-clinico">
              Riesgo bajo: mantener control preventivo y seguimiento periódico.
            </p>
          )}

          {formulario.riesgoCaries?.nivel === "Medio" && (
            <p className="mensaje-riesgo-clinico">
              Riesgo medio: se recomienda una revisión clínica cuidadosa y
              refuerzo de hábitos de higiene oral.
            </p>
          )}

          {formulario.riesgoCaries?.nivel === "Alto" && (
            <p className="mensaje-riesgo-clinico">
              Riesgo alto: se recomienda una evaluación clínica detallada del
              odontograma y planificación preventiva o restauradora según
              hallazgos.
            </p>
          )}
        </section>

        <section className="seccion-ficha">
          <h3>Odontograma</h3>

          <p className="subtexto-ficha">
            El odontograma se completa manualmente tras la evaluación clínica
            del paciente. Selecciona el tratamiento y luego haz clic en el
            diente correspondiente.
          </p>

          <p className="subtexto-ficha">
            Blanco: sano | Negro: caries por caras | Azul: conducto | Gris: extracción
          </p>

          <div className="selector-tratamiento">
            <h4>Seleccionar tratamiento</h4>

            <div className="botones-tratamiento">
              <button
                type="button"
                className={`boton-tratamiento ${
                  tratamientoActivo === "sano" ? "boton-activo" : ""
                }`}
                onClick={() => setTratamientoActivo("sano")}
              >
                Sano
              </button>

              <button
                type="button"
                className={`boton-tratamiento ${
                  tratamientoActivo === "caries" ? "boton-activo" : ""
                }`}
                onClick={() => setTratamientoActivo("caries")}
              >
                Caries
              </button>

              <button
                type="button"
                className={`boton-tratamiento ${
                  tratamientoActivo === "conducto" ? "boton-activo" : ""
                }`}
                onClick={() => setTratamientoActivo("conducto")}
              >
                Conducto
              </button>

              <button
                type="button"
                className={`boton-tratamiento ${
                  tratamientoActivo === "extraccion" ? "boton-activo" : ""
                }`}
                onClick={() => setTratamientoActivo("extraccion")}
              >
                Extracción
              </button>
            </div>
          </div>

          <Odontograma
            odontograma={formulario.odontograma}
            alCambiarDiente={cambiarEstadoDiente}
            tratamientoActivo={tratamientoActivo}
          />
        </section>

        {dientesConNotas.length > 0 && (
          <section className="seccion-ficha">
            <h3>Observaciones por diente tratado</h3>

            <div className="grid-dos">
              {dientesConNotas.map((diente) => (
                <div key={diente.numero} className="bloque-nota-diente">
                  <label>
                    Diente {diente.numero} ({obtenerTipoTratamientoDiente(diente)})
                  </label>
                  <textarea
                    rows="2"
                    value={diente.notas || ""}
                    onChange={(e) =>
                      manejarNotasDiente(diente.numero, e.target.value)
                    }
                    placeholder="Observaciones de esta pieza dental"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="seccion-ficha">
          <h3>Consulta odontológica</h3>

          <textarea
            name="motivoConsulta"
            value={formulario.motivoConsulta || ""}
            onChange={manejarCambio}
            placeholder="Motivo general de consulta"
          />

          <textarea
            name="observaciones"
            value={formulario.observaciones || ""}
            onChange={manejarCambio}
            placeholder="Observaciones clínicas"
          />
        </section>

        <section className="seccion-ficha">
          <h3>Diagnóstico y tratamiento</h3>

          <textarea
            name="diagnostico"
            value={formulario.diagnostico || ""}
            onChange={manejarCambio}
            placeholder="Diagnóstico"
          />

          <textarea
            name="tratamiento"
            value={formulario.tratamiento || ""}
            onChange={manejarCambio}
            placeholder="Tratamiento"
          />
        </section>

        <div className="barra-acciones-ficha">
          <button type="button" className="boton-principal" onClick={alCerrar}>
            Cancelar
          </button>
          <button type="submit" className="boton-principal">
            Guardar ficha
          </button>
        </div>
      </form>
    </div>
  );
}