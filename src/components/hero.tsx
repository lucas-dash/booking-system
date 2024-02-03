import Testimonials from './features/testimonials';

export default function Hero() {
  return (
    <section className="min-h-screen grid sm:grid-cols-2 max-sm:bg-mobile-pattern p-3">
      <article className="z-10 flex flex-col items-center justify-around mt-20">
        <h1 className="text-4xl sm:text-5xl font-semibold max-sm:text-primary p-4 max-sm:text-center">
          Reserve Your Ideal Holiday
        </h1>

        <Testimonials />
      </article>

      <div className="bg-gray-900/70 sm:hidden absolute inset-0"></div>

      <section className="w-full h-full flex items-center justify-center max-sm:hidden">
        <img
          src="/src/assets/cottage.WEBP"
          alt="our cottage"
          className="object-cover w-full h-full rounded-r-2xl"
        />
      </section>
    </section>
  );
}
