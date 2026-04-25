import { motion } from "framer-motion";
import fondocitaImg from "../../assets/tratamientos/fondocita.png"
import imagen2 from "../../assets/tratamientos/imagen2.jpeg";
import limpieza from "../../assets/tratamientos/limpieza.png";

export function DentalGallery() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] px-6 py-28">
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-sky-700 shadow-sm">
            Experiencia visual
          </p>

          <h2 className="max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
            Un espacio moderno para una atención cómoda y profesional.
          </h2>

          <p className="mt-6 max-w-2xl leading-8 text-slate-600">
            Combinamos tecnología, organización y atención cercana para que cada
            paciente tenga una experiencia clara desde el primer contacto.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="group relative min-h-[560px] overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/60 md:col-span-2 md:row-span-2"
          >
            <img
              src={fondocitaImg}
              alt="Atención odontológica"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] bg-white/90 p-6 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-700">
                Clínica moderna
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                Atención enfocada en comodidad, seguridad y confianza.
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group relative min-h-[270px] overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-200/60"
          >
            <img
              src={limpieza}
              alt="Limpieza dental"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-100">
                Tecnología
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">
                Procedimientos más claros y seguros.
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative min-h-[270px] overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-200/60"
          >
            <img
              src={imagen2}
              alt="Revisión dental"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-100">
                Confianza
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">
                Seguimiento profesional en cada visita.
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 to-teal-500 p-8 text-white shadow-xl shadow-sky-200/70 md:col-span-2"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-100">
              Atención integral
            </p>

            <h3 className="mt-6 text-3xl font-light leading-tight">
              Diagnóstico, tratamiento y seguimiento en un solo proceso.
            </h3>

            <p className="mt-5 leading-7 text-sky-50">
              Desde la primera cita hasta el seguimiento posterior, la
              información del paciente queda organizada para una atención clara,
              moderna y profesional.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}