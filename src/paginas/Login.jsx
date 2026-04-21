import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../servicios/auth";
import { supabase } from "../servicios/supabase";
import logoClinica from "../assets/logo-clinica.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

      if (mensaje.includes("email not confirmed")) {
        setErrorMsg("Debes confirmar tu correo antes de iniciar sesión");
      } else if (mensaje.includes("invalid login credentials")) {
        setErrorMsg("Correo o contraseña incorrectos");
      } else if (
        mensaje.includes("cannot coerce the result to a single json object")
      ) {
        setErrorMsg("Hay un problema con el perfil del usuario en la base de datos");
      } else {
        setErrorMsg(error.message || "No se pudo iniciar sesión");
      }
    } finally {
      setCargando(false);
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
    </div>
  );
}

export default Login;