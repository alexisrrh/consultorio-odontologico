import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { usuario, perfil, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(perfil?.rol)) {
    if (perfil?.rol === "medico") {
      return <Navigate to="/dashboard-medico" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;