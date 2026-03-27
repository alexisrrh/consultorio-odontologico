import { useMemo, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import Odontograma from "./Odontograma";
import logo1 from "../assets/logo1.png";
import marca from "../assets/marca.png";

export default function PresupuestoPaciente({
  paciente,
  alCerrar,
  logoEsquinaSrc = logo1,
  marcaAguaSrc = marca,
})  {
  const presupuestoRef = useRef(null);

  const [tratamientos, setTratamientos] = useState(
    (paciente?.tratamientos || []).map((t, index) => ({
      id: t.id || Date.now() + index,
      nombre: t.nombre || "Nuevo tratamiento",
      dientes: t.dientes || "",
      cantidad: t.cantidad || 1,
      precio: t.precio || 0,
    }))
  );

  if (!paciente) return null;

  const total = useMemo(() => {
    return tratamientos.reduce(
      (acc, t) => acc + (Number(t.precio) || 0) * (Number(t.cantidad) || 1),
      0
    );
  }, [tratamientos]);

  const cambiarCampo = (id, campo, valor) => {
    setTratamientos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              [campo]:
                campo === "cantidad" || campo === "precio"
                  ? Number(valor) || 0
                  : valor,
            }
          : t
      )
    );
  };

  const agregarTratamiento = () => {
    setTratamientos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: "Nuevo tratamiento",
        dientes: "",
        cantidad: 1,
        precio: 0,
      },
    ]);
  };

  const eliminarTratamiento = (id) => {
    setTratamientos((prev) => prev.filter((t) => t.id !== id));
  };

  const imprimirPresupuesto = () => {
    window.print();
  };
const descargarPDF = async () => {
  if (!presupuestoRef.current) return;

  const elemento = presupuestoRef.current;
  const ocultarEnPdf = document.querySelectorAll(".no-print");

  ocultarEnPdf.forEach((el) => {
    el.dataset.prevDisplay = el.style.display || "";
    el.style.display = "none";
  });

  const opciones = {
    margin: [8, 8, 8, 8],
    filename: `presupuesto-${paciente.nombre || "paciente"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    await html2pdf().set(opciones).from(elemento).save();
  } finally {
    ocultarEnPdf.forEach((el) => {
      el.style.display = el.dataset.prevDisplay || "";
      delete el.dataset.prevDisplay;
    });
  }
};

  return (
    <div className="contenedor-ficha-completa">
      <div className="presupuesto-bloque-titulo">
      
        <h1 className="presupuesto-titulo-principal">Presupuesto Odontológico</h1>
      </div>

     <div className="presupuesto-container" ref={presupuestoRef}>
        {logoEsquinaSrc && (
          <img
            src={logoEsquinaSrc}
            alt="Logo de la clínica"
            className="presupuesto-logo-esquina"
          />
        )}

      <header className="presupuesto-header">
  <div className="presupuesto-header-superior">
    {logoEsquinaSrc && (
      <img
        src={logoEsquinaSrc}
        alt="Logo de la clínica"
        className="presupuesto-logo-esquina"
      />
    )}

    <div className="presupuesto-clinica">
      <h2>ODONTÓLOGO GENERAL</h2>
      <h1>José J. Figueroa</h1>
      <p>Teléfono: 0412-0282591</p>
    </div>
  </div>

  <div className="presupuesto-bloque-titulo">
    <h2 className="presupuesto-titulo">PRESUPUESTO</h2>
  </div>
</header>

        <section className="presupuesto-seccion datos-con-marca">
          {marcaAguaSrc && (
            <img
              src={marcaAguaSrc}
              alt="Marca de agua"
              className="marca-agua-datos"
            />
          )}

          <h3>Datos del paciente</h3>

          <div className="presupuesto-datos-grid">
            <div>
              <p><strong>Paciente:</strong> {paciente.nombre || "-"}</p>
              <p><strong>Cédula:</strong> {paciente.cedula || "-"}</p>
              <p><strong>Teléfono:</strong> {paciente.telefono || "-"}</p>
            </div>

            <div>
              <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Correo:</strong> {paciente.email || "-"}</p>
              <p><strong>Dirección:</strong> {paciente.direccion || "-"}</p>
            </div>
          </div>
        </section>

        <section className="presupuesto-seccion">
          <h3>Odontograma</h3>
      <div className="presupuesto-odontograma-wrap">
  <Odontograma
    odontograma={paciente.odontograma || []}
    alCambiarDiente={() => {}}
  />

          </div>
        </section>

        <section className="presupuesto-seccion">
          <div className="presupuesto-tratamientos-header no-print">
            <h3>Tratamientos</h3>
            <button
              type="button"
              className="boton-principal"
              onClick={agregarTratamiento}
            >
              Agregar tratamiento
            </button>
          </div>

          <div className="presupuesto-tabla">
            <div className="fila encabezado-tabla">
              <span>Tratamiento</span>
              <span>Pieza</span>
              <span>Cantidad</span>
              <span>Precio</span>
              <span>Subtotal</span>
              <span className="col-acciones no-print">Acción</span>
            </div>

            {tratamientos.length === 0 ? (
              <div className="fila fila-vacia">
                <span>No hay tratamientos registrados.</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span className="no-print">-</span>
              </div>
            ) : (
              tratamientos.map((t) => (
                <div key={t.id} className="fila">
                  <span>
                    <input
                      className="input-presupuesto no-print"
                      type="text"
                      value={t.nombre}
                      onChange={(e) =>
                        cambiarCampo(t.id, "nombre", e.target.value)
                      }
                    />
                    <span className="solo-print">{t.nombre}</span>
                  </span>

                  <span>
                    <input
                      className="input-presupuesto no-print"
                      type="text"
                      value={t.dientes}
                      onChange={(e) =>
                        cambiarCampo(t.id, "dientes", e.target.value)
                      }
                    />
                    <span className="solo-print">{t.dientes || "-"}</span>
                  </span>

                  <span>
                    <input
                      className="input-presupuesto no-print"
                      type="number"
                      min="1"
                      value={t.cantidad}
                      onChange={(e) =>
                        cambiarCampo(t.id, "cantidad", e.target.value)
                      }
                    />
                    <span className="solo-print">{t.cantidad}</span>
                  </span>

                  <span>
                    <input
                      className="input-presupuesto no-print"
                      type="number"
                      min="0"
                      step="0.01"
                      value={t.precio}
                      onChange={(e) =>
                        cambiarCampo(t.id, "precio", e.target.value)
                      }
                    />
                    <span className="solo-print">
                      {Number(t.precio).toFixed(2)}$
                    </span>
                  </span>

                  <span>
                    {((Number(t.precio) || 0) * (Number(t.cantidad) || 1)).toFixed(2)}$
                  </span>

                  <span className="col-acciones no-print">
                    <button
                      type="button"
                      className="boton-peligro boton-mini"
                      onClick={() => eliminarTratamiento(t.id)}
                    >
                      Quitar
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="presupuesto-total">
            <strong>Monto total: {total.toFixed(2)}$</strong>
          </div>
        </section>

        <section className="presupuesto-seccion">
          <h3>Observaciones</h3>
          <p>
            Este presupuesto puede variar según evaluación clínica, hallazgos
            adicionales o cambios en el plan de tratamiento.
          </p>
          <p className="subtexto-ficha">
            Puedes editar tratamientos, imprimir o descargar PDF.
          </p>
        </section>
      </div>

      <div className="acciones-documento no-imprimir">
        <button type="button" className="boton-principal" onClick={alCerrar}>
          Volver
        </button>

        <button
          type="button"
          className="boton-principal"
          onClick={imprimirPresupuesto}
        >
          Imprimir
        </button>

        <button
          type="button"
          className="boton-principal"
          onClick={descargarPDF}
        >
          Descargar PDF
        </button>
      </div>

      <footer className="presupuesto-footer">
        <p>@od.josefigueroa</p>
      </footer>
    </div>
  );
}