const beneficios = [
  "Agenda de citas rápida y organizada",
  "Historia clínica digital del paciente",
  "Odontograma y presupuesto integrado",
  "Seguimiento profesional continuo",
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
      "Citas, historial y documentos integrados en un solo flujo digital.",
  },
];

export function Benefits() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
            ¿Por qué elegirnos?
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
            Una atención dental más organizada, clara y profesional.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-600">
            Un sistema pensado para mejorar la experiencia del paciente y optimizar el trabajo clínico.
          </p>
        </div>

        {/* BENEFICIOS RÁPIDOS */}
        <div className="mb-16 grid gap-4 md:grid-cols-2">
          {beneficios.map((beneficio) => (
            <div
              key={beneficio}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-sky-50 p-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
                ✓
              </span>

              <p className="font-medium text-slate-800">{beneficio}</p>
            </div>
          ))}
        </div>

        {/* CARDS DE CONFIANZA */}
        <div className="grid gap-6 md:grid-cols-4">
          {razonesConfianza.map((item) => (
            <article
              key={item.titulo}
              className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-xl text-sky-600">
                ✦
              </div>

              <h3 className="text-lg font-bold text-slate-950">
                {item.titulo}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {item.descripcion}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}