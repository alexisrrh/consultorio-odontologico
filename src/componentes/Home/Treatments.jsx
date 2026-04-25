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
  },
  {
    titulo: "Blanqueamiento",
    descripcion:
      "Tratamiento estético para mejorar el tono de los dientes y lograr una sonrisa más luminosa.",
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

export function Treatments({ irAccionPrincipal, usuario }) {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
              Tratamientos
            </p>

            <h2 className="max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
              Servicios dentales pensados para salud, estética y bienestar.
            </h2>
          </div>

          <p className="max-w-md leading-8 text-slate-600">
            Atención organizada para cada etapa: diagnóstico, tratamiento y
            seguimiento profesional.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {tratamientos.map((tratamiento) => (
            <article
              key={tratamiento.titulo}
              className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={tratamiento.imagen}
                  alt={tratamiento.titulo}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-700">
                  Tratamiento
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
                  onClick={irAccionPrincipal}
                  className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
                >
                  {!usuario ? "Iniciar para continuar" : "Solicitar cita"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}