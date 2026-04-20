import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../servicios/auth";
import { supabase } from "../servicios/supabase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);

      await loginUsuario({ email, password });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No se pudo obtener el usuario autenticado");
      }

      const { data: perfil, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (perfil?.rol === "medico") {
        navigate("/dashboard-medico");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Error iniciando sesión:", error);
      alert(error.message || "No se pudo iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "420px",
        }}
      >
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;