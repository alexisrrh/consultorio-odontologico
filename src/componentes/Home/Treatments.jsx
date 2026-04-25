import { motion } from "framer-motion";

import blanqueamientoImg from "../../assets/tratamientos/blanqueamientoImg.jpg";
import ortodonciaImg from "../../assets/tratamientos/ortodonciaImg.jpg";
import revisionImg from "../../assets/tratamientos/revisionImg.jpeg";
import limpiezaImg from "../../assets/tratamientos/limpiezaImg.avif";
import endodonciaImg from "../../assets/tratamientos/endodonciaImg.webp";
import implanteImg from "../../assets/tratamientos/implanteImg.jpg";

const tratamientos = [
  {
    titulo: "Limpieza dental",
    descripcion:
      "Eliminación de placa y sarro para mantener una boca sana y prevenir enfermedades.",
    imagen: limpiezaImg,
    icono: "✦",
  },
  {
    titulo: "Blanqueamiento",
    descripcion:
      "Tratamiento estético para mejorar el tono de los dientes y lograr una sonrisa más luminosa.",
    imagen: blanqueamientoImg,
    icono: "✧",
  },
  {
    titulo: "Ortodoncia",
    descripcion:
      "Corrección de la posición dental para mejorar estética, mordida y salud bucal.",
    imagen: ortodonciaImg,
    icono: "⌁",
  },
  {
    titulo: "Endodoncia",
    descripcion:
      "Tratamiento para salvar piezas dentales dañadas y eliminar dolor o infección.",
    imagen: endodonciaImg,
    icono: "＋",
  },
  {
    titulo: "Implantes dentales",
    descripcion:
      "Reemplazo de piezas perdidas con una solución fija, funcional y estética.",
    imagen: implanteImg,
    icono: "◎",
  },
  {
    titulo: "Revisión general",
    descripcion:
      "Valoración completa para detectar a tiempo caries, inflamaciones y otros problemas.",
    imagen: revisionImg,
    icono: "✓",
  },
];

export function Treatments({ irAccionPrincipal, usuario }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-sky-700">
              Tratamientos
            </p>

            <h2 className="max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
              Servicios dentales para cuidar tu salud y mejorar tu sonrisa.
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-slate-600">
            Atención organizada para cada etapa: diagnóstico, tratamiento,
            seguimiento y prevención.
          </p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {tratamientos.map((tratamiento, index) => (
            <motion.article
              key={tratamiento.titulo}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/50"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={tratamiento.imagen}
                  alt={tratamiento.titulo}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-xl font-bold text-sky-600 shadow-lg">
                  {tratamiento.icono}
                </div>

                <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-700">
                  Tratamiento dental
                </span>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-bold text-slate-950">
                  {tratamiento.titulo}
                </h3>

                <p className="mt-4 min-h-24 leading-7 text-slate-600">
                  {tratamiento.descripcion}
                </p>

                <button
                  type="button"
                  onClick={irAccionPrincipal}
                  className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-sky-600"
                >
                  {!usuario ? "Iniciar para solicitar cita" : "Solicitar cita"}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}