import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { usuario, perfil, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login-cliente" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(perfil?.rol)) {
    if (perfil?.rol === "medico") {
      return <Navigate to="/panel-clinico" replace />;
    }

    return <Navigate to="/agendar-cita" replace />;
  }

  return children;
}

export default ProtectedRoute;