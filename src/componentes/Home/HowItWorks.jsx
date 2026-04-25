const pasos = [
  {
    numero: "01",
    titulo: "Crea tu cuenta",
    descripcion:
      "Regístrate para acceder a tu área personal y gestionar tus citas.",
  },
  {
    numero: "02",
    titulo: "Agenda tu cita",
    descripcion:
      "Selecciona el tipo de consulta y solicita atención de forma rápida.",
  },
  {
    numero: "03",
    titulo: "Recibe seguimiento",
    descripcion:
      "Tu historial, citas y tratamientos quedan organizados para futuras visitas.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#f7fbff] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
            Cómo funciona
          </p>

          <h2 className="max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
            Un proceso simple para recibir atención dental organizada.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pasos.map((paso) => (
            <article
              key={paso.numero}
              className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60"
            >
              <span className="text-sm font-bold text-sky-600">
                {paso.numero}
              </span>

              <h3 className="mt-8 text-2xl font-bold text-slate-950">
                {paso.titulo}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {paso.descripcion}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}