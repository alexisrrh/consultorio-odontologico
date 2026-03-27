import { useState } from "react";

const crearOdontogramaInicial = () => {
  const numeros = [
    18, 17, 16, 15, 14, 13, 12, 11,
    21, 22, 23, 24, 25, 26, 27, 28,
    48, 47, 46, 45, 44, 43, 42, 41,
    31, 32, 33, 34, 35, 36, 37, 38
  ];

  return numeros.map((numero) => ({
    numero,
    tratamientoGeneral: "sano",
    caras: {
      superior: "sano",
      izquierda: "sano",
      centro: "sano",
      derecha: "sano",
      inferior: "sano"
    },
    notas: ""
  }));
};

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

      fechaNacimiento: "",
      email: "",
      direccion: "",

      motivoConsulta: "",
      antecedentes: "",
      alergias: "",
      observaciones: "",

      medicamentos: "",
      enfermedades: "",
      habitos: [],
      embarazo: false,

      tejidos: [],
      motivoDetalle: [],
      habitosClinicos: [],
      enfermedadesClinicas: [],

      diagnostico: "",
      tratamiento: "",

      odontograma: crearOdontogramaInicial()
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

        <button type="submit" className="boton-principal">
          Registrar paciente
        </button>
      </form>
    </div>
  );
}