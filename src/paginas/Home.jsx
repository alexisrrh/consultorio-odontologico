import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";
import logoClinica from "../assets/logo-clinica.png";
import blanqueamientoImg from "../assets/tratamientos/blanqueamientoImg.jpg";
import ortodonciaImg from "../assets/tratamientos/ortodonciaImg.jpg";
import revisionImg from "../assets/tratamientos/revisionImg.jpeg";
import limpiezaImg  from "../assets/tratamientos/limpiezaImg.avif"
import endodonciaImg from "../assets/tratamientos/endodonciaImg.webp"
import implanteImg from "../assets/tratamientos/implanteImg.jpg"
import imagen1 from "../assets/tratamientos/imagen1.jpeg"
import imagen2 from "../assets/tratamientos/imagen2.jpeg"
import limpieza from "../assets/tratamientos/limpieza.png"
function Home() {
  const navigate = useNavigate();
  const { usuario, perfil } = useAuth();

  const tratamientos = [
    {
      titulo: "Limpieza dental",
      descripcion:
        "Eliminación de placa y sarro para mantener una boca sana y prevenir enfermedades.",
      imagen: limpiezaImg,
    },
    {
      titulo: "Blanqueamiento",
      descripcion:
        "Tratamiento estético para mejorar el tono de los dientes y dar una sonrisa más luminosa.",
      imagen: blanqueamientoImg,
    },
    {
      titulo: "Ortodoncia",
      descripcion:
        "Corrección de la posición dental para mejorar estética, mordida y salud bucal.",
      imagen: ortodonciaImg,
    },
    {
      titulo: "Endodoncia",
      descripcion:
        "Tratamiento para salvar piezas dentales dañadas y eliminar dolor o infección.",
      imagen: endodonciaImg,
    },
    {
      titulo: "Implantes dentales",
      descripcion:
        "Reemplazo de piezas perdidas con una solución fija, funcional y estética.",
      imagen: implanteImg,
    },
    {
      titulo: "Revisión general",
      descripcion:
        "Valoración completa para detectar a tiempo caries, inflamaciones y otros problemas.",
      imagen: revisionImg,
    },
  ];

  const beneficios = [
    "Agenda de citas rápida y organizada",
    "Historia clínica digital del paciente",
    "Odontograma y presupuesto integrado",
    "Atención más clara y seguimiento profesional",
  ];

  const testimonios = [
    {
      nombre: "María G.",
      texto:
        "La atención fue excelente desde la primera cita. Todo muy claro, profesional y organizado.",
    },
    {
      nombre: "Carlos R.",
      texto:
        "Me gustó mucho el trato y la rapidez para agendar. El seguimiento después de la consulta fue muy bueno.",
    },
    {
      nombre: "Andrea P.",
      texto:
        "La experiencia fue muy cómoda. Se nota el cuidado en cada detalle y la atención al paciente.",
    },
  ];

  const razonesConfianza = [
    {
      titulo: "Atención personalizada",
      descripcion:
        "Cada paciente recibe una evaluación clara y un tratamiento adaptado a sus necesidades.",
    },
    {
      titulo: "Seguimiento clínico",
      descripcion:
        "La información odontológica queda organizada para futuras consultas y controles.",
    },
    {
      titulo: "Presupuestos claros",
      descripcion:
        "Tratamientos explicados de forma sencilla, con mayor orden y transparencia.",
    },
    {
      titulo: "Experiencia moderna",
      descripcion:
        "Citas, historial, odontograma y documentos integrados en un solo flujo.",
    },
  ];

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
  };

  const irAccionPrincipal = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    if (perfil?.rol === "cliente") {
      navigate("/agendar-cita");
      return;
    }

    if (perfil?.rol === "medico") {
      navigate("/dashboard-medico");
      return;
    }

    navigate("/login");
  };

  const irAccionSecundaria = () => {
    if (!usuario) {
      navigate("/registro-cliente");
      return;
    }

    if (perfil?.rol === "cliente") {
      navigate("/mis-citas");
      return;
    }

    if (perfil?.rol === "medico") {
      navigate("/citas-medico");
      return;
    }

    navigate("/login");
  };

  const textoBotonPrincipal = !usuario
    ? "Iniciar sesión"
    : perfil?.rol === "cliente"
    ? "Agendar cita"
    : "Ir al panel médico";

  const textoBotonSecundario = !usuario
    ? "Crear cuenta"
    : perfil?.rol === "cliente"
    ? "Ver mis citas"
    : "Ver agenda";

  const renderBotonesNavbar = () => {
    if (!usuario) {
      return (
        <>
          <button onClick={() => navigate("/login")} className="btn-secundario">
            Iniciar sesión
          </button>

          <button
            onClick={() => navigate("/registro-cliente")}
            className="btn-principal"
          >
            Registrarse
          </button>
        </>
      );
    }

    if (perfil?.rol === "cliente") {
      return (
        <>
          <button onClick={() => navigate("/agendar-cita")} className="btn-secundario">
            Agendar cita
          </button>

          <button onClick={() => navigate("/mis-citas")} className="btn-secundario">
            Mis citas
          </button>

          <button onClick={handleLogout} className="btn-principal">
            Cerrar sesión
          </button>
        </>
      );
    }

    if (perfil?.rol === "medico") {
      return (
        <>
          <button
            onClick={() => navigate("/dashboard-medico")}
            className="btn-secundario"
          >
            Panel médico
          </button>

          <button onClick={handleLogout} className="btn-principal">
            Cerrar sesión
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <div className="home-clinica">
      <header className="home-navbar">
        <div className="home-brand" onClick={() => navigate("/")}>
          <img src={logoClinica} alt="Logo clínica" className="home-logo" />
          <div>
            <h1>Clínica Dental</h1>
            <p>Sonrisas sanas, atención profesional</p>
          </div>
        </div>

        <div className="home-nav-actions">{renderBotonesNavbar()}</div>
      </header>

      <section className="home-hero">
        <div className="home-hero-texto">
          <span className="home-badge">Atención profesional y cercana</span>
          <h2>
            Odontología profesional con una experiencia moderna, confiable y
            humana
          </h2>
          <p>
            Un espacio pensado para brindar atención dental de alto nivel, con
            gestión clara de citas, seguimiento clínico y una experiencia más
            cómoda para cada paciente.
          </p>

          <div className="home-hero-botones">
            <button onClick={irAccionPrincipal} className="btn-principal grande">
              {textoBotonPrincipal}
            </button>

            <button onClick={irAccionSecundaria} className="btn-secundario grande">
              {textoBotonSecundario}
            </button>
          </div>
        </div>

        <div className="home-hero-card">
          <h3>Dr. José J. Figueroa</h3>
          <p className="home-medico-cargo">
            Odontología general y atención integral
          </p>
          <p>
            Atención enfocada en diagnóstico, prevención y tratamiento integral
            para cada paciente.
          </p>

          <div className="home-medico-datos">
            <div>
              <strong>Especialidad</strong>
              <span>Odontología general</span>
            </div>
            <div>
              <strong>Horario</strong>
              <span>Lunes a viernes</span>
            </div>
            <div>
              <strong>Modalidad</strong>
              <span>Consulta con cita previa</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-seccion">
        <div className="home-seccion-header">
          <h3>Tratamientos</h3>
          <p>Servicios pensados para salud, estética y seguimiento dental.</p>
        </div>

        <div className="home-grid-tratamientos">
          {tratamientos.map((tratamiento) => (
            <article
              key={tratamiento.titulo}
              className="tratamiento-card premium-card"
            >
              <div className="tratamiento-imagen-wrap">
                <img
                  src={tratamiento.imagen}
                  alt={tratamiento.titulo}
                  className="tratamiento-imagen"
                />
                <div className="tratamiento-overlay" />
                <span className="tratamiento-chip">Tratamiento</span>
              </div>

              <div className="tratamiento-card-body">
                <h4>{tratamiento.titulo}</h4>
                <p>{tratamiento.descripcion}</p>

                <button
                  type="button"
                  className="tratamiento-boton"
                  onClick={irAccionPrincipal}
                >
                  {!usuario ? "Iniciar para continuar" : "Solicitar cita"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-seccion home-seccion-galeria">
        <div className="home-seccion-header">
          <h3>Atención con enfoque moderno</h3>
          <p>
            Espacios, tratamientos y seguimiento pensados para ofrecer una
            experiencia más profesional, visual y organizada.
          </p>
        </div>

        <div className="galeria-clinica">
          <div className="galeria-item galeria-item-grande">
            <img src={imagen1} alt="Atención odontológica" />
          </div>

          <div className="galeria-item">
            <img src={limpieza} alt="Ortodoncia" />
          </div>

          <div className="galeria-item">
            <img src={imagen2} alt="Revisión dental" />
          </div>
        </div>
      </section>

      <section className="home-seccion home-seccion-beneficios">
        <div className="home-seccion-header">
          <h3>¿Por qué elegirnos?</h3>
          <p>
            Un sistema de atención más ordenado para el paciente y más eficiente
            para el profesional.
          </p>
        </div>

        <div className="home-grid-beneficios">
          {beneficios.map((beneficio) => (
            <div key={beneficio} className="beneficio-card">
              <span className="beneficio-check">✓</span>
              <p>{beneficio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-seccion home-seccion-confianza">
        <div className="home-seccion-header">
          <h3>Confianza, claridad y atención profesional</h3>
          <p>
            Un servicio pensado para ofrecer seguridad, organización y una mejor
            experiencia en cada consulta.
          </p>
        </div>

        <div className="home-grid-confianza">
          {razonesConfianza.map((item) => (
            <article key={item.titulo} className="confianza-card">
              <div className="confianza-icono">✦</div>
              <h4>{item.titulo}</h4>
              <p>{item.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-seccion home-seccion-destacada">
        <div className="home-info-box">
          <h3>¿Cómo funciona?</h3>
          <div className="home-pasos">
            <div className="paso-item">
              <span>1</span>
              <div>
                <strong>Regístrate</strong>
                <p>Crea tu cuenta para gestionar tus citas de forma rápida.</p>
              </div>
            </div>

            <div className="paso-item">
              <span>2</span>
              <div>
                <strong>Inicia sesión</strong>
                <p>Accede a tu área para continuar con tu atención dental.</p>
              </div>
            </div>

            <div className="paso-item">
              <span>3</span>
              <div>
                <strong>Agenda y recibe seguimiento</strong>
                <p>
                  Tu información clínica y tus tratamientos quedan organizados
                  para futuras visitas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home-cta-box">
          <h3>Empieza hoy</h3>
          <p>
            Regístrate para gestionar tus citas y recibir atención dental de
            forma más rápida, clara y organizada.
          </p>

          <div className="home-cta-botones">
            <button onClick={irAccionPrincipal} className="btn-principal">
              {textoBotonPrincipal}
            </button>

            <button onClick={irAccionSecundaria} className="btn-secundario">
              {textoBotonSecundario}
            </button>
          </div>
        </div>
      </section>

      <section className="home-seccion home-seccion-testimonios">
        <div className="home-seccion-header">
          <h3>Lo que valoran nuestros pacientes</h3>
          <p>
            Una atención más humana, más clara y mejor organizada genera una
            experiencia diferente.
          </p>
        </div>

        <div className="home-grid-testimonios">
          {testimonios.map((testimonio) => (
            <article key={testimonio.nombre} className="testimonio-card">
              <div className="testimonio-estrellas">★★★★★</div>
              <p className="testimonio-texto">“{testimonio.texto}”</p>
              <div className="testimonio-autor">
                <div className="testimonio-avatar">
                  {testimonio.nombre.charAt(0)}
                </div>
                <div>
                  <strong>{testimonio.nombre}</strong>
                  <span>Paciente</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-seccion home-seccion-contacto">
        <div className="home-contacto-grid">
          <div className="contacto-card">
            <h3>Contacto</h3>
            <p>
              <strong>Teléfono:</strong> 0412-0282591
            </p>
            <p>
              <strong>Ubicación:</strong> Dirección de la clínica
            </p>
            <p>
              <strong>Correo:</strong> clinicadental@email.com
            </p>
          </div>

          <div className="contacto-card">
            <h3>Horario de atención</h3>
            <p>
              <strong>Lunes a viernes:</strong> 8:00 AM - 6:00 PM
            </p>
            <p>
              <strong>Sábados:</strong> 9:00 AM - 1:00 PM
            </p>
            <p>
              <strong>Domingos:</strong> Cerrado
            </p>
          </div>
        </div>
      </section>

      <section className="home-seccion home-seccion-cta-final">
        <div className="cta-final-premium">
          <div>
            <span className="home-badge">Da el siguiente paso</span>
            <h3>Empieza tu atención dental con un proceso claro y profesional</h3>
            <p>
              Accede a tu cuenta, consulta tus citas y gestiona tu atención en
              un entorno moderno, cómodo y organizado.
            </p>
          </div>

          <div className="cta-final-botones">
            <button onClick={irAccionPrincipal} className="btn-principal grande">
              {textoBotonPrincipal}
            </button>

            <button onClick={irAccionSecundaria} className="btn-secundario grande">
              {textoBotonSecundario}
            </button>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div>
          <strong>Clínica Dental</strong>
          <p>
            Atención odontológica profesional y seguimiento clínico organizado.
          </p>
        </div>

        <div className="home-footer-links">
          <button onClick={() => navigate("/")}>Inicio</button>
          <button onClick={irAccionPrincipal}>
            {!usuario ? "Iniciar sesión" : perfil?.rol === "cliente" ? "Agendar cita" : "Panel médico"}
          </button>
          <button onClick={irAccionSecundaria}>
            {!usuario ? "Crear cuenta" : perfil?.rol === "cliente" ? "Mis citas" : "Ver agenda"}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Home;