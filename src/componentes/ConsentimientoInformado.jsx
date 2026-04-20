import React from "react";

function formatearFecha(fecha) {
  if (!fecha) {
    return new Date().toLocaleDateString("es-ES");
  }

  try {
    return new Date(fecha).toLocaleDateString("es-ES");
  } catch {
    return fecha;
  }
}

export default function ConsentimientoInformado({
  paciente,
  profesional,
  procedimiento,
  fecha,
}) {
  const nombrePaciente =
    paciente?.nombre ||
    paciente?.full_name ||
    "____________________________";

  const cedulaPaciente =
    paciente?.cedula ||
    paciente?.dni ||
    "____________________________";

  const nombreProfesional =
    profesional?.nombre ||
    profesional?.full_name ||
    "____________________________";

  const procedimientoTexto =
    procedimiento || "______________________________________________";

  const fechaTexto = formatearFecha(fecha);

  const imprimirConsentimiento = () => {
    window.print();
  };

  return (
    <section className="seccion-consentimiento">
      <div className="consentimiento-header no-print">
        <h3>Consentimiento informado</h3>
        <button
          type="button"
          className="boton-principal"
          onClick={imprimirConsentimiento}
        >
          Imprimir consentimiento
        </button>
      </div>

      <div className="consentimiento-documento printable-area">
        <h2>CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTO ODONTOLÓGICO</h2>

        <p>
          <strong>Fecha:</strong> {fechaTexto}
        </p>

        <p>
          Yo, <strong>{nombrePaciente}</strong>, mayor de edad, identificado con
          la C.I. <strong>{cedulaPaciente}</strong>, en pleno uso de mis
          facultades mentales y de manera voluntaria, declaro lo siguiente:
        </p>

        <h4>1. Declaración de Comprensión</h4>
        <p>
          Yo, el paciente, reconozco que el 
          <strong> Dr. Jose Jesus Figueroa Hernandez.</strong> me ha explicado detalladamente y
          en lenguaje comprensible en qué consiste el procedimiento de:{" "}
          <strong>{procedimientoTexto}</strong>.
        </p>

        <h4>2. Riesgos, Beneficios y Alternativas</h4>
        <p>
          Certifico que he comprendido los beneficios esperados de este
          tratamiento, así como los riesgos generales y las posibles
          complicaciones específicas que podrían surgir.
        </p>

        <p>Declaro expresamente que:</p>
        <ul>
          <li>
            He sido informado sobre las alternativas disponibles al tratamiento
            propuesto.
          </li>
          <li>
            He tenido la oportunidad de realizar todas las preguntas necesarias
            sobre el procedimiento, sus alcances y sus limitaciones.
          </li>
          <li>
            Todas mis dudas han sido respondidas a mi entera satisfacción.
          </li>
        </ul>

        <h4>3. Naturaleza del Tratamiento</h4>
        <p>
          Entiendo que la odontología es una disciplina biológica y que, a pesar
          de la pericia del profesional, no se puede garantizar un éxito
          absoluto o un resultado estético específico, dado que la respuesta de
          los tejidos puede variar en cada individuo.
        </p>

        <h4>4. Veracidad de la Información</h4>
        <p>
          Doy fe de que los datos sobre mi estado de salud, antecedentes
          médicos, alergias y medicaciones actuales consignados en mi historia
          clínica son verdaderos y completos. Comprendo que la omisión de
          información relevante puede comprometer mi seguridad y el éxito del
          tratamiento.
        </p>

        <h4>5. Consentimiento Voluntario</h4>
        <p>
          Por lo expuesto anteriormente, reconozco que me han sido explicados y
          he comprendido los riesgos, beneficios y alternativas del
          procedimiento, por lo que doy mi consentimiento libre y consciente
          para que se realice el tratamiento odontológico mencionado.
        </p>

        <div className="firmas-consentimiento">
          <div className="firma-box">
            <div className="linea-firma" />
            <p>Firma del Paciente o Representante</p>
            <p>
              <strong>C.I.:</strong> {cedulaPaciente}
            </p>
          </div>

          <div className="firma-box">
            <div className="linea-firma" />
            <p>Firma y Sello del Odontólogo</p>
            <p>{nombreProfesional}</p>
          </div>
        </div>

        <p className="nota-consentimiento">
          <strong>Nota:</strong> Este documento es una declaración de voluntad y
          puede ser revocado por el paciente en cualquier momento antes del
          inicio del procedimiento.
        </p>
      </div>
    </section>
  );
}