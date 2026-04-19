import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarCliente } from "../servicios/auth";

function RegistroCliente() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      await registrarCliente({ nombre, email, password });
      alert("Registro correcto");
      navigate("/login-cliente");
    } catch (error) {
      console.error(error);
      alert(error.message || "No se pudo registrar");
    }
  };

  return (
    <form onSubmit={handleRegistro}>
      <h2>Registro Cliente</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

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

      <button type="submit">Registrarme</button>
    </form>
  );
}

export default RegistroCliente;