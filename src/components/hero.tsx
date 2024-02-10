import { useNavStore } from '@/store/navStore';
import Testimonials from './features/testimonials';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 'some' });

  const setActive = useNavStore((state) => state.setActive);

  useEffect(() => {
    if (isInView) {
      setActive('Hero');
    }
  }, [isInView, setActive]);

  return (
    <section
      id="Hero"
      ref={ref}
      className="min-h-screen grid sm:grid-cols-2 max-sm:bg-mobile-pattern p-3"
    >
      <article className="z-10 flex flex-col items-center justify-around mt-20">
        <h1 className="text-4xl sm:text-5xl font-semibold max-sm:text-primary p-4 max-sm:text-center">
          Reserve Your Ideal Holiday
        </h1>

        <Testimonials />
      </article>

      <div className="bg-gray-900/70 sm:hidden absolute inset-0"></div>

      <section className="w-full h-full flex items-center justify-center max-sm:hidden rounded-r-2xl overflow-hidden">
        <img
          src="/src/assets/cottage.WEBP"
          alt="our cottage"
          className="object-cover w-full h-full"
        />
      </section>
    </section>
  );
}
