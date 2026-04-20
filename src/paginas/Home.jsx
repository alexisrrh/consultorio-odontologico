import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";
import logoClinica from "../assets/logo-clinica.png";

function Home() {
  const navigate = useNavigate();
  const { usuario, perfil } = useAuth();

  const tratamientos = [
    {
      titulo: "Limpieza dental",
      descripcion:
        "Eliminación de placa y sarro para mantener una boca sana y prevenir enfermedades.",
    },
    {
      titulo: "Blanqueamiento",
      descripcion:
        "Tratamiento estético para mejorar el tono de los dientes y dar una sonrisa más luminosa.",
    },
    {
      titulo: "Ortodoncia",
      descripcion:
        "Corrección de la posición dental para mejorar estética, mordida y salud bucal.",
    },
    {
      titulo: "Endodoncia",
      descripcion:
        "Tratamiento para salvar piezas dentales dañadas y eliminar dolor o infección.",
    },
    {
      titulo: "Implantes dentales",
      descripcion:
        "Reemplazo de piezas perdidas con una solución fija, funcional y estética.",
    },
    {
      titulo: "Revisión general",
      descripcion:
        "Valoración completa para detectar a tiempo caries, inflamaciones y otros problemas.",
    },
  ];

  const handleLogout = async () => {
    try {
      await cerrarSesion();
      navigate("/");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
      alert("No se pudo cerrar sesión");
    }
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

        <div className="home-nav-actions">
          {!usuario ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn-secundario"
              >
                Iniciar sesión
              </button>

              <button
                onClick={() => navigate("/registro-cliente")}
                className="btn-principal"
              >
                Registrarse
              </button>
            </>
          ) : (
            <>
              {perfil?.rol === "cliente" && (
                <>
                  <button
                    onClick={() => navigate("/agendar-cita")}
                    className="btn-secundario"
                  >
                    Agendar cita
                  </button>

                  <button
                    onClick={() => navigate("/mis-citas")}
                    className="btn-secundario"
                  >
                    Mis citas
                  </button>
                </>
              )}

              {perfil?.rol === "medico" && (
                <button
                  onClick={() => navigate("/dashboard-medico")}
                  className="btn-secundario"
                >
                  Panel médico
                </button>
              )}

              <button onClick={handleLogout} className="btn-principal">
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      <section className="home-hero">
        <div className="home-hero-texto">
          <span className="home-badge">Atención profesional y cercana</span>
          <h2>Cuida tu sonrisa con un servicio dental moderno y confiable</h2>
          <p>
            Agenda tu cita de forma rápida, conoce nuestros tratamientos y recibe
            atención personalizada con seguimiento clínico completo.
          </p>

          <div className="home-hero-botones">
            {!usuario ? (
              <>
                <button
                  onClick={() => navigate("/agendar-cita")}
                  className="btn-principal grande"
                >
                  Agendar cita
                </button>

                <button
                  onClick={() => navigate("/registro-cliente")}
                  className="btn-secundario grande"
                >
                  Crear cuenta
                </button>
              </>
            ) : perfil?.rol === "cliente" ? (
              <>
                <button
                  onClick={() => navigate("/agendar-cita")}
                  className="btn-principal grande"
                >
                  Agendar cita
                </button>

                <button
                  onClick={() => navigate("/mis-citas")}
                  className="btn-secundario grande"
                >
                  Ver mis citas
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/dashboard-medico")}
                  className="btn-principal grande"
                >
                  Ir al panel médico
                </button>

                <button
                  onClick={() => navigate("/citas-medico")}
                  className="btn-secundario grande"
                >
                  Ver agenda
                </button>
              </>
            )}
          </div>
        </div>

        <div className="home-hero-card">
          <h3>Dr. Jose Jesus</h3>
          <p className="home-medico-cargo">Odontólogo</p>
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
            <article key={tratamiento.titulo} className="tratamiento-card">
              <h4>{tratamiento.titulo}</h4>
              <p>{tratamiento.descripcion}</p>
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
                <p>Crea tu cuenta para poder gestionar tus citas.</p>
              </div>
            </div>

            <div className="paso-item">
              <span>2</span>
              <div>
                <strong>Agenda tu cita</strong>
                <p>Selecciona fecha y hora disponible en pocos segundos.</p>
              </div>
            </div>

            <div className="paso-item">
              <span>3</span>
              <div>
                <strong>Recibe atención y seguimiento</strong>
                <p>Tu información clínica queda organizada para futuras visitas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="home-cta-box">
          <h3>Empieza hoy</h3>
          <p>
            Regístrate para gestionar tus citas y recibir atención dental de forma
            más rápida y organizada.
          </p>

          <div className="home-cta-botones">
            {!usuario ? (
              <>
                <button
                  onClick={() => navigate("/registro-cliente")}
                  className="btn-principal"
                >
                  Registrarme
                </button>

                <button
                  onClick={() => navigate("/agendar-cita")}
                  className="btn-secundario"
                >
                  Agendar cita
                </button>
              </>
            ) : perfil?.rol === "cliente" ? (
              <>
                <button
                  onClick={() => navigate("/agendar-cita")}
                  className="btn-principal"
                >
                  Agendar cita
                </button>

                <button
                  onClick={() => navigate("/mis-citas")}
                  className="btn-secundario"
                >
                  Mis citas
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/dashboard-medico")}
                  className="btn-principal"
                >
                  Panel médico
                </button>

                <button
                  onClick={() => navigate("/citas-medico")}
                  className="btn-secundario"
                >
                  Ver agenda
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;