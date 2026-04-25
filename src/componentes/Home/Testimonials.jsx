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

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
            Testimonios
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
            Lo que valoran nuestros pacientes.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.map((testimonio) => (
            <article
              key={testimonio.nombre}
              className="rounded-[2rem] border border-slate-100 bg-[#f7fbff] p-8 shadow-lg shadow-slate-200/50"
            >
              <div className="text-lg text-amber-400">★★★★★</div>

              <p className="mt-6 leading-8 text-slate-600">
                “{testimonio.texto}”
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 font-bold text-white">
                  {testimonio.nombre.charAt(0)}
                </div>

                <div>
                  <strong className="text-slate-950">
                    {testimonio.nombre}
                  </strong>
                  <p className="text-sm text-slate-500">Paciente</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}