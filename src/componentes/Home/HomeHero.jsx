import { useState } from "react";
import { motion } from "framer-motion";
import fondoHome from "../../assets/tratamientos/fondoHome.jpeg";
import logoClinica from "../../assets/logo-clinica.png";

export function HomeHero({
  usuario,
  perfil,
  navigate,
  handleLogout,
  textoBotonPrincipal,
}) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    consulta: "Tipo de consulta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const irAccionPrincipalHero = () => {
    if (!usuario) return navigate("/login");
    if (perfil?.rol === "cliente") return navigate("/agendar-cita");
    if (perfil?.rol === "medico") return navigate("/dashboard-medico");
    navigate("/login");
  };

  const enviarWhatsApp = () => {
    if (
      !form.nombre.trim() ||
      !form.apellido.trim() ||
      !form.cedula.trim() ||
      !form.telefono.trim()
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (form.consulta === "Tipo de consulta") {
      alert("Selecciona el tipo de consulta.");
      return;
    }

    const numeroClinica = "584120282591";

    const mensaje = `Hola, quiero agendar una cita dental:

Nombre: ${form.nombre} ${form.apellido}
Cédula: ${form.cedula}
Teléfono: ${form.telefono}
Consulta: ${form.consulta}`;

    window.open(
      `https://wa.me/${numeroClinica}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#eef9fd]">
      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-3"
        >
          <img
            src={logoClinica}
            alt="Logo"
            className="h-16 w-16 rounded-2xl object-cover shadow"
          />

          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Dr. José Figuera
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Odontología avanzada
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!usuario ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="rounded-2xl border border-sky-200 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:border-sky-500"
              >
                Iniciar sesión
              </button>

              <button
                type="button"
                onClick={() => navigate("/registro-cliente")}
                className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-sky-500"
              >
                Registrarse
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={irAccionPrincipalHero}
                className="rounded-2xl border border-sky-200 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:border-sky-500"
              >
                {textoBotonPrincipal}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-sky-500"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <span className="inline-flex rounded-full border border-sky-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-700 shadow-sm">
            Atención moderna y cercana
          </span>

          <h2 className="mt-8 max-w-3xl text-6xl font-light leading-none tracking-tight text-slate-950 md:text-7xl">
            Luce una{" "}
            <span className="block font-serif italic text-teal-600">
              Sonrisa
            </span>
            Hermosa.
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Cuidado dental profesional para ti y tu familia. Agenda tu cita de
            forma rápida, fácil y segura.
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[
              "Profesionales certificados",
              "Agenda fácil y rápida",
              "Atención personalizada",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-sky-100 bg-white p-5 text-center shadow-md"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-sky-300 text-sky-600">
                  ✓
                </div>
                <p className="text-sm font-bold text-slate-800">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex max-w-xl gap-4 rounded-3xl border border-sky-100 bg-white p-5 shadow-lg">
            <div className="flex-1">
              <strong className="text-3xl text-sky-700">+6</strong>
              <p className="text-sm text-slate-500">Tratamientos</p>
            </div>

            <div className="w-px bg-slate-200" />

            <div className="flex-1">
              <strong className="text-3xl text-sky-700">24h</strong>
              <p className="text-sm text-slate-500">Gestión online</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative min-h-[770px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-white shadow-2xl">
            <img
              src={fondoHome}
              alt="Dentista profesional"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="absolute left-1/2 top-[68%] w-[520px] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/70 bg-white/30 p-6 shadow-2xl">
            <h3 className="text-center text-3xl font-bold text-slate-950">
              Agenda tu cita
            </h3>

            <p className="mt-2 text-center text-slate-500 text-slate-900">
              Solicita atención dental de forma rápida y sencilla.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="rounded-2xl border border-sky-200 bg-white px-5 py-4 text-slate-900 outline-none focus:border-sky-500"
              />

              <input
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="rounded-2xl border border-sky-200 bg-white px-5 py-4 text-slate-900 outline-none focus:border-sky-500"
              />

              <input
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                placeholder="Cédula"
                className="rounded-2xl border border-sky-200 bg-white px-5 py-4 text-slate-900 outline-none focus:border-sky-500"
              />

              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="rounded-2xl border border-sky-200 bg-white px-5 py-4 text-slate-900 outline-none focus:border-sky-500"
              />

              <select
                name="consulta"
                value={form.consulta}
                onChange={handleChange}
                className="rounded-2xl border border-sky-200 bg-white px-5 py-4 text-slate-900 outline-none focus:border-sky-500 md:col-span-2"
              >
                <option>Tipo de consulta</option>
                 <option>Revisión general</option>
                <option>Limpieza dental</option>
                <option>Blanqueamiento</option>
                <option>Dolor de muela</option>
                <option>Sensibilidad</option>
                  <option>Fractura dental</option>
                    <option>Sangrado de encias</option>
                       <option>Protesis dental</option>
               
              </select>

              <button
                type="button"
                onClick={enviarWhatsApp}
                className="rounded-2xl bg-green-600 px-5 py-4 font-bold text-white transition hover:bg-sky-500 md:col-span-2"
              >
                Agendar por WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}