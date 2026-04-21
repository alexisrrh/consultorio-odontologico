import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario, enviarRecuperacionPassword } from "../servicios/auth";
import { supabase } from "../servicios/supabase";
import logoClinica from "../assets/logo-clinica.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [emailRecuperacion, setEmailRecuperacion] = useState("");
  const [cargandoRecuperacion, setCargandoRecuperacion] = useState(false);
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState("");
  const [errorRecuperacion, setErrorRecuperacion] = useState("");

  const cerrarModalRecuperacion = () => {
    setMostrarRecuperacion(false);
    setMensajeRecuperacion("");
    setErrorRecuperacion("");
    setCargandoRecuperacion(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setCargando(true);

      await loginUsuario({ email, password });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No se pudo obtener el usuario autenticado");
      }

      const { data: perfiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);

      if (error) throw error;

      const perfil = perfiles?.[0] || null;

      if (perfil?.rol === "medico") {
        navigate("/dashboard-medico");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Error iniciando sesión:", error);

      const mensaje = error.message?.toLowerCase() || "";

      if (mensaje.includes("invalid login credentials")) {
        setErrorMsg("Correo o contraseña incorrectos");
      } else {
        setErrorMsg(error.message || "No se pudo iniciar sesión");
      }
    } finally {
      setCargando(false);
    }
  };

  const handleRecuperacion = async (e) => {
    e.preventDefault();
    setMensajeRecuperacion("");
    setErrorRecuperacion("");

    try {
      setCargandoRecuperacion(true);
      await enviarRecuperacionPassword(emailRecuperacion.trim());

      setMensajeRecuperacion(
        "Te enviamos un enlace para restablecer tu contraseña. Revisa tu correo."
      );
    } catch (error) {
      console.error("Error enviando recuperación:", error);
      setErrorRecuperacion(
        error.message || "No se pudo enviar el correo de recuperación"
      );
    } finally {
      setCargandoRecuperacion(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logoClinica} alt="Logo clínica" className="login-logo" />
          <h2>Iniciar sesión</h2>
          <p>Accede a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Correo"
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
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            className="login-forgot-link"
            onClick={() => {
              setMostrarRecuperacion(true);
              setEmailRecuperacion(email);
              setMensajeRecuperacion("");
              setErrorRecuperacion("");
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>

          {errorMsg && <p className="login-error">{errorMsg}</p>}

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-extra">
          <p>¿No tienes una cuenta?</p>
          <button
            type="button"
            className="login-link"
            onClick={() => navigate("/registro-cliente")}
          >
            Regístrate aquí
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

      {mostrarRecuperacion && (
        <div
          className="login-modal-overlay"
          onClick={cerrarModalRecuperacion}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Recuperar contraseña</h3>
            <p>
              Introduce tu correo y te enviaremos un enlace para cambiar la contraseña.
            </p>

            <form onSubmit={handleRecuperacion} className="login-form">
              <div className="login-input-group">
                <label htmlFor="emailRecuperacion">Correo electrónico</label>
                <input
                  id="emailRecuperacion"
                  type="email"
                  placeholder="Correo"
                  value={emailRecuperacion}
                  onChange={(e) => setEmailRecuperacion(e.target.value)}
                  required
                />
              </div>

              {errorRecuperacion && (
                <p className="login-error">{errorRecuperacion}</p>
              )}

              {mensajeRecuperacion && (
                <p className="login-success">{mensajeRecuperacion}</p>
              )}

              <div className="login-modal-actions">
                <button
                  type="button"
                  className="login-back-btn"
                  onClick={cerrarModalRecuperacion}
                >
                  Cerrar
                </button>

                <button
                  type="submit"
                  className="login-btn"
                  disabled={cargandoRecuperacion}
                >
                  {cargandoRecuperacion ? "Enviando..." : "Enviar enlace"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;