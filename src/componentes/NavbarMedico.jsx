import { useNavigate, useLocation } from "react-router-dom";
import { cerrarSesion } from "../servicios/auth";
import logoClinica from "../assets/logo-clinica.png";
function NavbarMedico() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/login-medico");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  const links = [
    { label: "Dashboard", path: "/dashboard-medico" },
    { label: "Panel clínico", path: "/panel-clinico" },
    { label: "Citas", path: "/citas-medico" },
  ];

  return (
    <nav className="navbar-medico">
      <div className="navbar-medico__left">
        <div className="navbar-medico__brand" onClick={() => navigate("/dashboard-medico")}>
          <img
  src={logoClinica}
  alt="Logo clínica"
  className="navbar-medico__logo"
/>
          <div className="navbar-medico__brand-text">
            <span className="navbar-medico__title">Clínica Dental</span>
            <span className="navbar-medico__subtitle">Panel médico</span>
          </div>
        </div>

        <div className="navbar-medico__links">
          {links.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`navbar-medico__link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="navbar-medico__right">
        <button onClick={handleLogout} className="navbar-medico__logout">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default NavbarMedico;