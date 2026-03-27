import Diente from "./Diente";

export default function Odontograma({
  odontograma,
  alCambiarDiente,
  tratamientoActivo,
  modoImpresion = false,
}) {
  const filaSuperior = odontograma.filter((d) =>
    [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].includes(
      d.numero
    )
  );

  const filaInferior = odontograma.filter((d) =>
    [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38].includes(
      d.numero
    )
  );

  const dientesConMasEspacio = [18, 17, 16, 26, 27, 28, 48, 47, 46, 36, 37, 38];
  const modo = modoImpresion ? "lectura" : "edicion";

  return (
    <div
      className={`odontograma-realista ${
        modoImpresion ? "odontograma-modo-impresion" : ""
      }`}
    >
      <div className="odontograma-canvas">
        <div className="encia encia-superior" />
        <div className="encia encia-inferior" />

        <div className="arcada arcada-superior">
          {filaSuperior.map((diente) => (
            <div
              key={diente.numero}
              className={`slot ${
                dientesConMasEspacio.includes(diente.numero)
                  ? "zona-espaciada"
                  : ""
              }`}
            >
              <Diente
                diente={diente}
                alCambiarDiente={alCambiarDiente}
                tratamientoActivo={tratamientoActivo}
                modo={modo}
              />
            </div>
          ))}
        </div>

        <div className="arcada arcada-inferior">
          {filaInferior.map((diente) => (
            <div
              key={diente.numero}
              className={`slot ${
                dientesConMasEspacio.includes(diente.numero)
                  ? "zona-espaciada"
                  : ""
              }`}
            >
              <Diente
                diente={diente}
                alCambiarDiente={alCambiarDiente}
                tratamientoActivo={tratamientoActivo}
                modo={modo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}