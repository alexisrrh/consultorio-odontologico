export default function Diente({ diente, alCambiarDiente, modo }) {
  const manejarClick = () => {
    if (modo === "lectura") return;
    if (typeof alCambiarDiente === "function") {
      alCambiarDiente(diente.numero);
    }
  };

  const color = () => {
    if (diente.estado === "caries") return "#dc3545";
    if (diente.estado === "conducto") return "#2563eb";
    if (diente.estado === "extraccion") return "#6b7280";
    return "#ffffff";
  };

  return (
    <div
      className="diente-svg"
      onClick={manejarClick}
      style={{ cursor: modo === "lectura" ? "default" : "pointer" }}
    >
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
          fill={color()}
          stroke="#374151"
          strokeWidth="2"
        />
      </svg>

      <span className="numero-diente">{diente.numero}</span>
    </div>
  );
}