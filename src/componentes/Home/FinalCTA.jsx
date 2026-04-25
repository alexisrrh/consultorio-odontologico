export function FinalCTA({
  irAccionPrincipal,
  irAccionSecundaria,
  textoBotonPrincipal,
  textoBotonSecundario,
}) {
  return (
    <section className="relative overflow-hidden bg-sky-600 px-6 py-24 text-white">
      
      {/* fondo decorativo */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        
        <span className="inline-block rounded-full border border-white/30 px-6 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
          Empieza hoy
        </span>

        <h2 className="mt-8 text-4xl font-light leading-tight md:text-6xl">
          Da el siguiente paso hacia una atención dental organizada y profesional
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
          Accede a tu cuenta, agenda tu cita y gestiona tu atención de forma
          moderna, clara y sin complicaciones.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={irAccionPrincipal}
            className="rounded-full bg-white px-8 py-4 text-sm font-bold text-sky-600 transition hover:bg-slate-100"
          >
            {textoBotonPrincipal}
          </button>

          <button
            onClick={irAccionSecundaria}
            className="rounded-full border border-white px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-sky-600"
          >
            {textoBotonSecundario}
          </button>
        </div>
      </div>
    </section>
  );
}