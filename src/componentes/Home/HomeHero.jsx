import { useState } from "react";
import logoClinica from "../../assets/logo-clinica.png";
import heroDentalImg from "../../assets/tratamientos/imagen1.jpeg";

export function HomeHero({
  usuario,
  perfil,
  navigate,
  handleLogout,
  irAccionPrincipal,
  irAccionSecundaria,
  textoBotonPrincipal,
  textoBotonSecundario,
}) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    consulta: "Tipo de consulta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviarWhatsApp = () => {
    const numeroClinica = "584120282591";

    const mensaje = `Hola, quiero agendar una cita dental.

Nombre: ${form.nombre}
Teléfono: ${form.telefono}
Tipo de consulta: ${form.consulta}`;

    const url = `https://wa.me/${numeroClinica}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  const renderBotonesNavbar = () => {
    if (!usuario) {
      return (
        <>
          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-sky-200 px-5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => navigate("/registro-cliente")}
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Registrarse
          </button>
        </>
      );
    }

    if (perfil?.rol === "cliente") {
      return (
        <>
          <button
            onClick={() => navigate("/agendar-cita")}
            className="rounded-full border border-sky-200 px-5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
          >
            Agendar cita
          </button>

          <button
            onClick={() => navigate("/mis-citas")}
            className="rounded-full border border-sky-200 px-5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
          >
            Mis citas
          </button>

          <button
            onClick={handleLogout}
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
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
            className="rounded-full border border-sky-200 px-5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
          >
            Panel médico
          </button>

          <button
            onClick={handleLogout}
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Cerrar sesión
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-cyan-50">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-3"
        >
          <img
            src={logoClinica}
            alt="Logo clínica"
            className="h-12 w-12 rounded-2xl object-cover shadow-md"
          />

          <div>
            <h1 className="text-lg font-bold text-slate-950">
              Clínica Dental
            </h1>
            <p className="text-xs text-slate-500">
              Atención profesional y humana
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {renderBotonesNavbar()}
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <span className="inline-flex rounded-full border border-sky-200 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 shadow-sm backdrop-blur">
            Atención moderna y cercana
          </span>

          <h2 className="mt-7 max-w-4xl text-5xl font-light leading-tight tracking-tight text-slate-950 md:text-7xl">
            Odontología profesional con una experiencia moderna, confiable y
            humana
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Agenda tu cita, gestiona tus consultas y recibe seguimiento clínico
            de forma clara, organizada y profesional.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={irAccionPrincipal}
              className="rounded-full bg-sky-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-sky-600/20 transition hover:-translate-y-1 hover:bg-sky-500"
            >
              {textoBotonPrincipal}
            </button>

            <button
              onClick={irAccionSecundaria}
              className="rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-slate-800 transition hover:-translate-y-1 hover:border-sky-400 hover:text-sky-700"
            >
              {textoBotonSecundario}
            </button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
              <strong className="text-2xl text-slate-950">+6</strong>
              <p className="mt-1 text-xs text-slate-500">Tratamientos</p>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
              <strong className="text-2xl text-slate-950">24h</strong>
              <p className="mt-1 text-xs text-slate-500">Gestión online</p>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-sm">
              <strong className="text-2xl text-slate-950">100%</strong>
              <p className="mt-1 text-xs text-slate-500">Organizado</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl shadow-sky-900/10">
            <img
              src={heroDentalImg}
              alt="Atención odontológica profesional"
              className="h-[620px] w-full rounded-[2rem] object-cover"
            />
          </div>

          <div className="absolute bottom-8 left-6 right-6 rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-slate-950">
              Agenda tu cita
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Solicita atención dental de forma rápida y sencilla.
            </p>

            <div className="mt-5 grid gap-3">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
                placeholder="Nombre completo"
              />

              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
                placeholder="Teléfono"
              />

              <select
                name="consulta"
                value={form.consulta}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
              >
                <option>Tipo de consulta</option>
                <option>Limpieza dental</option>
                <option>Blanqueamiento</option>
                <option>Ortodoncia</option>
                <option>Endodoncia</option>
                <option>Implantes dentales</option>
                <option>Revisión general</option>
              </select>

              <button
                type="button"
                onClick={enviarWhatsApp}
                className="rounded-2xl bg-sky-600 px-5 py-3 font-bold text-white transition hover:bg-sky-500"
              >
                Agendar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}