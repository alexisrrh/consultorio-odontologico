import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualizarPasswordNueva } from "../servicios/auth";
import logoClinica from "../assets/logo-clinica.png";

function ActualizarPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");

  const handleActualizar = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMensajeOk("");

    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmarPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);
      await actualizarPasswordNueva(password);
      setMensajeOk("Contraseña actualizada correctamente");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error actualizando contraseña:", error);
      setErrorMsg(error.message || "No se pudo actualizar la contraseña");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card actualizar-password-card">
        <div className="login-header">
          <img src={logoClinica} alt="Logo clínica" className="login-logo" />
          <h2>Nueva contraseña</h2>
          <p>Introduce tu nueva contraseña para continuar</p>
        </div>

        <form onSubmit={handleActualizar} className="login-form">
          <div className="login-input-group">
            <label htmlFor="password">Nueva contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="confirmarPassword">Confirmar contraseña</label>
            <input
              id="confirmarPassword"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && <p className="login-error">{errorMsg}</p>}
          {mensajeOk && <p className="login-success">{mensajeOk}</p>}

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? "Actualizando..." : "Guardar nueva contraseña"}
          </button>

          <button
            type="button"
            className="login-back-btn actualizar-password-back"
            onClick={() => navigate("/login")}
          >
            Volver al login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActualizarPassword;