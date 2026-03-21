export default function Diente({ diente, alCambiarCara }) {
  const siguienteEstado = (estado) => {
    if (estado === "sano") return "caries";
    if (estado === "caries") return "restauracion";
    if (estado === "restauracion") return "ausente";
    return "sano";
  };

  const cambiarCara = (cara) => {
    const estadoActual = diente.caras?.[cara] || "sano";
    const nuevoEstado = siguienteEstado(estadoActual);
    alCambiarCara(diente.numero, cara, nuevoEstado);
  };

  const colorCara = (cara) => {
    const estado = diente.caras?.[cara] || "sano";

    if (estado === "caries") return "#dc3545";
    if (estado === "restauracion") return "#2563eb";
    if (estado === "ausente") return "#94a3b8";
    return "#ffffff";
  };

  const tipoDiente = () => {
    const n = diente.numero % 10;
    if (n === 1 || n === 2) return "incisivo";
    if (n === 3) return "canino";
    if (n === 4 || n === 5) return "premolar";
    return "molar";
  };

  const renderMolar = () => (
    <svg width="74" height="96" viewBox="0 0 100 120">
      <path
        d="
          M25,10
          C18,10 12,15 11,24
          C10,34 15,42 18,50
          C20,56 22,64 24,74
          C26,88 31,108 39,108
          C45,108 46,94 50,86
          C54,94 55,108 61,108
          C69,108 74,88 76,74
          C78,64 80,56 82,50
          C85,42 90,34 89,24
          C88,15 82,10 75,10
          C69,10 64,13 60,18
          C57,22 54,24 50,24
          C46,24 43,22 40,18
          C36,13 31,10 25,10
          Z
        "
        fill="#fffdfd"
        stroke="#475569"
        strokeWidth="2.4"
      />

      <path
        d="
          M31,18
          C37,14 43,13 50,13
          C57,13 63,14 69,18
          L64,30
          C59,28 55,27 50,27
          C45,27 41,28 36,30
          Z
        "
        fill={colorCara("superior")}
        stroke="#64748b"
        strokeWidth="1.3"
        onClick={() => cambiarCara("superior")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="
          M19,33
          C18,43 21,50 24,59
          C26,67 28,75 31,84
          L40,77
          C37,69 35,61 34,53
          C33,46 33,39 36,31
          Z
        "
        fill={colorCara("izquierda")}
        stroke="#64748b"
        strokeWidth="1.3"
        onClick={() => cambiarCara("izquierda")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="
          M39,33
          C43,30 46,29 50,29
          C54,29 57,30 61,33
          C60,40 60,47 60,55
          C60,61 58,69 55,76
          L45,76
          C42,69 40,61 40,55
          C40,47 40,40 39,33
          Z
        "
        fill={colorCara("centro")}
        stroke="#64748b"
        strokeWidth="1.3"
        onClick={() => cambiarCara("centro")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="
          M64,31
          C67,39 67,46 66,53
          C65,61 63,69 60,77
          L69,84
          C72,75 74,67 76,59
          C79,50 82,43 81,33
          Z
        "
        fill={colorCara("derecha")}
        stroke="#64748b"
        strokeWidth="1.3"
        onClick={() => cambiarCara("derecha")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="
          M43,79
          L57,79
          C56,87 54,94 52,101
          C51,104 49,104 48,101
          C46,94 44,87 43,79
          Z
        "
        fill={colorCara("inferior")}
        stroke="#64748b"
        strokeWidth="1.3"
        onClick={() => cambiarCara("inferior")}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );

  const renderPremolar = () => (
    <svg width="64" height="94" viewBox="0 0 84 120">
      <path
        d="
          M26,10
          C18,10 13,15 12,24
          C11,34 16,43 19,51
          C21,58 24,66 27,80
          C29,90 33,106 40,106
          C47,106 51,90 53,80
          C56,66 59,58 61,51
          C64,43 69,34 68,24
          C67,15 62,10 54,10
          C49,10 46,13 42,17
          C38,13 35,10 30,10
          Z
        "
        fill="#fffdfd"
        stroke="#475569"
        strokeWidth="2.2"
      />

      <path
        d="M31,18 Q42,12 53,18 L49,29 Q42,26 35,29 Z"
        fill={colorCara("superior")}
        stroke="#64748b"
        strokeWidth="1.2"
        onClick={() => cambiarCara("superior")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M21,31 L33,30 L33,53 L25,58 Q22,47 21,31 Z"
        fill={colorCara("izquierda")}
        stroke="#64748b"
        strokeWidth="1.2"
        onClick={() => cambiarCara("izquierda")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M34,30 Q42,27 50,30 L49,55 Q42,59 35,55 Z"
        fill={colorCara("centro")}
        stroke="#64748b"
        strokeWidth="1.2"
        onClick={() => cambiarCara("centro")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M51,30 L63,31 Q62,47 59,58 L51,53 Z"
        fill={colorCara("derecha")}
        stroke="#64748b"
        strokeWidth="1.2"
        onClick={() => cambiarCara("derecha")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M37,58 L47,58 Q46,69 44,81 Q42,88 40,81 Q38,69 37,58 Z"
        fill={colorCara("inferior")}
        stroke="#64748b"
        strokeWidth="1.2"
        onClick={() => cambiarCara("inferior")}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );

  const renderCanino = () => (
    <svg width="58" height="96" viewBox="0 0 76 124">
      <path
        d="
          M30,10
          C21,10 16,16 16,25
          C16,34 20,44 24,54
          C28,65 31,76 34,100
          C35,108 41,108 42,100
          C45,76 48,65 52,54
          C56,44 60,34 60,25
          C60,16 55,10 46,10
          C43,10 40,12 38,15
          C36,12 33,10 30,10
          Z
        "
        fill="#fffdfd"
        stroke="#475569"
        strokeWidth="2.2"
      />

      <path
        d="M31,18 Q38,13 45,18 L43,28 Q38,26 33,28 Z"
        fill={colorCara("superior")}
        stroke="#64748b"
        strokeWidth="1.15"
        onClick={() => cambiarCara("superior")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M24,30 L33,29 L33,51 L27,56 Q24,45 24,30 Z"
        fill={colorCara("izquierda")}
        stroke="#64748b"
        strokeWidth="1.15"
        onClick={() => cambiarCara("izquierda")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M34,29 Q38,27 42,29 L42,53 Q38,57 34,53 Z"
        fill={colorCara("centro")}
        stroke="#64748b"
        strokeWidth="1.15"
        onClick={() => cambiarCara("centro")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M43,29 L52,30 Q52,45 49,56 L43,51 Z"
        fill={colorCara("derecha")}
        stroke="#64748b"
        strokeWidth="1.15"
        onClick={() => cambiarCara("derecha")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M35,56 L41,56 Q40,68 39,82 Q38,91 37,82 Q36,68 35,56 Z"
        fill={colorCara("inferior")}
        stroke="#64748b"
        strokeWidth="1.15"
        onClick={() => cambiarCara("inferior")}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );

  const renderIncisivo = () => (
    <svg width="56" height="92" viewBox="0 0 72 118">
      <path
        d="
          M28,10
          C20,10 16,15 16,24
          C16,34 20,43 24,52
          C27,60 30,71 33,93
          C34,101 38,101 39,93
          C42,71 45,60 48,52
          C52,43 56,34 56,24
          C56,15 52,10 44,10
          C41,10 39,11 36,13
          C33,11 31,10 28,10
          Z
        "
        fill="#fffdfd"
        stroke="#475569"
        strokeWidth="2.1"
      />

      <path
        d="M29,18 Q36,15 43,18 L41,28 Q36,26 31,28 Z"
        fill={colorCara("superior")}
        stroke="#64748b"
        strokeWidth="1.1"
        onClick={() => cambiarCara("superior")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M23,30 L31,29 L31,49 L26,53 Q23,43 23,30 Z"
        fill={colorCara("izquierda")}
        stroke="#64748b"
        strokeWidth="1.1"
        onClick={() => cambiarCara("izquierda")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M32,29 Q36,27 40,29 L40,51 Q36,54 32,51 Z"
        fill={colorCara("centro")}
        stroke="#64748b"
        strokeWidth="1.1"
        onClick={() => cambiarCara("centro")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M41,29 L49,30 Q49,43 46,53 L41,49 Z"
        fill={colorCara("derecha")}
        stroke="#64748b"
        strokeWidth="1.1"
        onClick={() => cambiarCara("derecha")}
        style={{ cursor: "pointer" }}
      />

      <path
        d="M33,53 L39,53 Q38,63 37,75 Q36,82 35,75 Q34,63 33,53 Z"
        fill={colorCara("inferior")}
        stroke="#64748b"
        strokeWidth="1.1"
        onClick={() => cambiarCara("inferior")}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );

  const renderByType = () => {
    const tipo = tipoDiente();
    if (tipo === "molar") return renderMolar();
    if (tipo === "premolar") return renderPremolar();
    if (tipo === "canino") return renderCanino();
    return renderIncisivo();
  };

  return (
    <div className="diente-svg" title={`Diente ${diente.numero}`}>
      {renderByType()}
      <span className="numero-diente">{diente.numero}</span>
    </div>
  );
}