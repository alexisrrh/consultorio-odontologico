import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../servicios/auth";
import { supabase } from "../servicios/supabase";

function LoginMedico() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUsuario({ email, password });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: perfil, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (perfil.rol !== "medico") {
        alert("Este usuario no es médico");
        return;
      }

      navigate("/dashboard-medico");
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login Médico</h2>

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

      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginMedico;