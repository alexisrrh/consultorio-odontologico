export default function Diente({
  diente,
  alCambiarDiente,
  modo,
  tratamientoActivo,
}) {
  const esLectura = modo === "lectura";

  const caras = diente.caras || {
    superior: "sano",
    izquierda: "sano",
    centro: "sano",
    derecha: "sano",
    inferior: "sano",
  };

  const tieneCariesEnAlgunaCara =
    caras.superior === "caries" ||
    caras.izquierda === "caries" ||
    caras.centro === "caries" ||
    caras.derecha === "caries" ||
    caras.inferior === "caries";

  const mostrarCaras = tratamientoActivo === "caries" || tieneCariesEnAlgunaCara;

  const colorDiente = () => {
    if (diente.tratamientoGeneral === "conducto") return "#2563eb"; // azul
    if (diente.tratamientoGeneral === "extraccion") return "#6b7280"; // gris
    return "#ffffff";
  };

  const colorCara = (estadoCara) => {
    if (estadoCara === "caries") return "#111111"; // negro
    return "transparent";
  };

  const bordeCara = (estadoCara) => {
    if (estadoCara === "caries") return "#111111";
    return "#9ca3af";
  };

  const limpiarCaras = {
    superior: "sano",
    izquierda: "sano",
    centro: "sano",
    derecha: "sano",
    inferior: "sano",
  };

  const manejarClickDiente = () => {
    if (esLectura) return;
    if (typeof alCambiarDiente !== "function") return;

    if (tratamientoActivo === "caries") return;

    if (tratamientoActivo === "sano") {
      alCambiarDiente(diente.numero, {
        ...diente,
        tratamientoGeneral: "sano",
        caras: limpiarCaras,
      });
      return;
    }

    alCambiarDiente(diente.numero, {
      ...diente,
      tratamientoGeneral: tratamientoActivo,
      caras: limpiarCaras,
    });
  };

  const manejarClickCara = (cara, e) => {
    e.stopPropagation();

    if (esLectura) return;
    if (tratamientoActivo !== "caries") return;
    if (typeof alCambiarDiente !== "function") return;

    const nuevoEstado = caras[cara] === "caries" ? "sano" : "caries";

    alCambiarDiente(diente.numero, {
      ...diente,
      tratamientoGeneral: "sano",
      caras: {
        ...caras,
        [cara]: nuevoEstado,
      },
    });
  };

  return (
    <div className="diente-svg" onClick={manejarClickDiente}>
      <svg width="60" height="80" viewBox="0 0 80 100">
        <path
          d="
            M20,10
            C10,10 10,25 15,35
            C20,45 22,55 25,75
            C27,90 35,95 40,95
            C45,95 53,90 55,75
            C58,55 60,45 65,35
            C70,25 70,10 60,10
            C55,10 50,15 45,18
            C42,20 38,20 35,18
            C30,15 25,10 20,10
            Z
          "
          fill={colorDiente()}
          stroke="#4b5563"
          strokeWidth="2"
        />

        {mostrarCaras && (
          <>
            {/* SUPERIOR */}
            <rect
              x="27"
              y="16"
              width="25"
              height="10"
              rx="10"
              fill={colorCara(caras.superior)}
              stroke={bordeCara(caras.superior)}
              strokeWidth="1"
              onClick={(e) => manejarClickCara("superior", e)}
            />

            {/* IZQUIERDA */}
            <rect
              x="22"
              y="25"
              width="8"
              height="34"
              rx="20"
              fill={colorCara(caras.izquierda)}
              stroke={bordeCara(caras.izquierda)}
              strokeWidth="1"
              onClick={(e) => manejarClickCara("izquierda", e)}
            />

            {/* CENTRO */}
            <rect
              x="33"
              y="30"
              width="14"
              height="25"
              rx="5"
              fill={colorCara(caras.centro)}
              stroke={bordeCara(caras.centro)}
              strokeWidth="1"
              onClick={(e) => manejarClickCara("centro", e)}
            />

            {/* DERECHA */}
            <rect
              x="50"
              y="25"
              width="8"
              height="34"
              rx="20"
              fill={colorCara(caras.derecha)}
              stroke={bordeCara(caras.derecha)}
              strokeWidth="1"
              onClick={(e) => manejarClickCara("derecha", e)}
            />

            {/* INFERIOR */}
            <rect
              x="28"
              y="60"
              width="24"
              height="30"
              rx="10"
              fill={colorCara(caras.inferior)}
              stroke={bordeCara(caras.inferior)}
              strokeWidth="1"
              onClick={(e) => manejarClickCara("inferior", e)}
            />
          </>
        )}
      </svg>

      <span className="numero-diente">{diente.numero}</span>
    </div>
  );
}