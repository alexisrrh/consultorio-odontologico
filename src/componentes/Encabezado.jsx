import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

function Encabezado() {
  return (
    <header className="barra-superior-minimal">
      <div className="barra-superior-minimal__contenido">
        
        {/* IZQUIERDA */}
        <div className="logo-izquierdo">
          <img src={logo1} alt="Logo izquierda" />
        </div>

        {/* DERECHA */}
        <div className="logo-derecho">
          <img src={logo1} alt="Logo derecha" />
        </div>

      </div>
    </header>
  );
}

export default Encabezado;