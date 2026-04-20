import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarCliente } from "../servicios/auth";
import logoClinica from "../assets/logo-clinica.png";

function RegistroCliente() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMensajeOk("");

    try {
      setCargando(true);

      await registrarCliente({ nombre, email, password });

      setMensajeOk("Registro correcto. Ya puedes iniciar sesión.");
      setNombre("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || "No se pudo registrar");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logoClinica} alt="Logo clínica" className="login-logo" />
          <h2>Crear cuenta</h2>
          <p>Regístrate como paciente para gestionar tus citas</p>
        </div>

        <form onSubmit={handleRegistro} className="login-form">
          <div className="login-input-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {errorMsg && <p className="login-error">{errorMsg}</p>}
          {mensajeOk && <p className="login-success">{mensajeOk}</p>}

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <div className="login-extra">
          <p>¿Ya tienes una cuenta?</p>
          <button
            type="button"
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Inicia sesión aquí
          </button>
        </div>

        <div className="login-extra-secundario">
          <button
            type="button"
            className="login-back-btn"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistroCliente;