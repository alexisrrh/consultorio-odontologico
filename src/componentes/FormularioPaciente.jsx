import { useState } from "react";

export default function FormularioPaciente({ alGuardar }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
  });

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!formulario.nombre.trim() || !formulario.cedula.trim()) {
      alert("Nombre y cédula son obligatorios");
      return;
    }

    const nuevoPaciente = {
      id: crypto.randomUUID(),
      nombre: formulario.nombre,
      cedula: formulario.cedula,
      telefono: formulario.telefono,

      // datos personales
      fechaNacimiento: "",
      email: "",
      direccion: "",

      // historia clínica
      motivoConsulta: "",
      antecedentes: "",
      alergias: "",
      observaciones: "",

      // historia médica ampliada
      medicamentos: "",
      enfermedades: "",
      habitos: [],
      embarazo: false,

      // examen clínico tipo formulario físico
      tejidos: [],
      motivoDetalle: [],
      habitosClinicos: [],
      enfermedadesClinicas: [],

      // odontología
      diagnostico: "",
      tratamiento: "",
    };

    alGuardar(nuevoPaciente);

    setFormulario({
      nombre: "",
      cedula: "",
      telefono: "",
    });
  };

  return (
    <div className="tarjeta">
      <h2>Registro rápido</h2>

      <form className="formulario" onSubmit={manejarEnvio}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={manejarCambio}
        />

        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={formulario.cedula}
          onChange={manejarCambio}
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={manejarCambio}
        />

        <button type="submit">Registrar paciente</button>
      </form>
    </div>
  );
}