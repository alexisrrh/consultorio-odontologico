import imagen1 from "../../assets/tratamientos/imagen1.jpeg";
import imagen2 from "../../assets/tratamientos/imagen2.jpeg";
import limpieza from "../../assets/tratamientos/limpieza.png";

export function DentalGallery() {
  return (
    <section className="bg-[#f7fbff] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-600">
            Experiencia visual
          </p>

          <h2 className="max-w-4xl text-4xl font-light leading-tight text-slate-950 md:text-6xl">
            Un espacio pensado para una atención moderna y cómoda.
          </h2>

          <p className="mt-6 max-w-2xl leading-8 text-slate-600">
            Combinamos atención profesional, tecnología y organización para que
            cada paciente tenga una experiencia clara desde el primer contacto.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <div className="overflow-hidden rounded-[2rem] md:col-span-2 md:row-span-2">
            <img
              src={imagen1}
              alt="Atención odontológica"
              className="h-full min-h-[520px] w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={limpieza}
              alt="Limpieza dental"
              className="h-64 w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="overflow-hidden rounded-[2rem]">
            <img
              src={imagen2}
              alt="Revisión dental"
              className="h-64 w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="rounded-[2rem] bg-sky-600 p-8 text-white md:col-span-2">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-100">
              Atención integral
            </p>

            <h3 className="mt-6 text-3xl font-light">
              Diagnóstico, tratamiento y seguimiento en un solo proceso.
            </h3>

            <p className="mt-5 leading-7 text-sky-50">
              Desde la primera cita hasta el seguimiento posterior, la
              información del paciente queda organizada para una atención más
              clara y profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}