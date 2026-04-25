import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cerrarSesion } from "../servicios/auth";

import { HomeHero } from "../componentes/Home/HomeHero";
import { Treatments } from "../componentes/Home/Treatments";
import { DentalGallery } from "../componentes/Home/DentalGallery";
import { Benefits } from "../componentes/Home/Benefits";
import { HowItWorks } from "../componentes/Home/HowItWorks";
import { Testimonials } from "../componentes/Home/Testimonials";
import { HomeContact } from "../componentes/Home/HomeContact";
import { FinalCTA } from "../componentes/Home/FinalCTA";

function Home() {
  const navigate = useNavigate();
  const { usuario, perfil, loading } = useAuth();

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
    if (!usuario) return navigate("/login");
    if (perfil?.rol === "cliente") return navigate("/agendar-cita");
    if (perfil?.rol === "medico") return navigate("/dashboard-medico");
    navigate("/login");
  };

  const irAccionSecundaria = () => {
    if (!usuario) return navigate("/registro-cliente");
    if (perfil?.rol === "cliente") return navigate("/mis-citas");
    if (perfil?.rol === "medico") return navigate("/citas-medico");
    navigate("/registro-cliente");
  };

  const textoBotonPrincipal = !usuario
    ? "Iniciar sesión"
    : perfil?.rol === "cliente"
    ? "Agendar cita"
    : perfil?.rol === "medico"
    ? "Ir al panel médico"
    : "Iniciar sesión";

  const textoBotonSecundario = !usuario
    ? "Crear cuenta"
    : perfil?.rol === "cliente"
    ? "Ver mis citas"
    : perfil?.rol === "medico"
    ? "Ver agenda"
    : "Crear cuenta";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-900">
      <HomeHero
        usuario={usuario}
        perfil={perfil}
        navigate={navigate}
        handleLogout={handleLogout}
        irAccionPrincipal={irAccionPrincipal}
        irAccionSecundaria={irAccionSecundaria}
        textoBotonPrincipal={textoBotonPrincipal}
        textoBotonSecundario={textoBotonSecundario}
      />

      <Treatments irAccionPrincipal={irAccionPrincipal} usuario={usuario} />
      <DentalGallery />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <HomeContact />
      <FinalCTA
        irAccionPrincipal={irAccionPrincipal}
        irAccionSecundaria={irAccionSecundaria}
        textoBotonPrincipal={textoBotonPrincipal}
        textoBotonSecundario={textoBotonSecundario}
      />
    </main>
  );
}

export default Home;