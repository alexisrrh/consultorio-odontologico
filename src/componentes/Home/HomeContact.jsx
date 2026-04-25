export function HomeContact() {
  return (
    <section className="bg-[#f7fbff] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
            Contacto
          </p>

          <h2 className="max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
            Información clara para agendar tu atención.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-2xl font-bold text-slate-950">
              Datos de contacto
            </h3>

            <div className="mt-6 space-y-3 text-slate-600">
              <p>
                <strong>Teléfono:</strong> 0412-0282591
              </p>
              <p>
                <strong>Ubicación:</strong> Dirección de la clínica
              </p>
              <p>
                <strong>Correo:</strong> clinicadental@email.com
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-2xl font-bold text-slate-950">
              Horario de atención
            </h3>

            <div className="mt-6 space-y-3 text-slate-600">
              <p>
                <strong>Lunes a viernes:</strong> 8:00 AM - 6:00 PM
              </p>
              <p>
                <strong>Sábados:</strong> 9:00 AM - 1:00 PM
              </p>
              <p>
                <strong>Domingos:</strong> Cerrado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}