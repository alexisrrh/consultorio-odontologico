import { cerrarSesion } from "../servicios/auth";
import { useNavigate } from "react-router-dom";

function Encabezado() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/login-cliente");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  return (
    <div>
      <h1>Clínica</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Encabezado;