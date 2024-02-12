import { Link } from 'react-scroll';
import Testimonials from './features/testimonials';
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useNavStore } from '@/store/navStore';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.8,
  });

  const setActive = useNavStore((state) => state.setActive);

  useEffect(() => {
    if (isInView) {
      setActive('');
    }
  }, [isInView, setActive]);
  return (
    <section
      className="min-h-[100dvh] grid sm:grid-cols-2 max-sm:bg-mobile-pattern p-3"
      ref={ref}
    >
      <article className="z-10 flex flex-col items-center justify-evenly mt-20 max-sm:mb-20">
        <h1 className="text-4xl sm:text-5xl font-semibold max-sm:text-primary p-4 max-sm:text-center">
          Reserve Your Ideal Holiday
        </h1>

        <Testimonials />
        <div className="flex items-center gap-4">
          <Button variant={'secondary'} asChild>
            <Link
              to={'Contact'}
              spy={true}
              offset={-100}
              smooth={true}
              duration={600}
              aria-label="scroll to section"
              role="button"
            >
              Contact
            </Link>
          </Button>
          <Button asChild>
            <Link
              to={'Reservation'}
              spy={true}
              offset={-100}
              smooth={true}
              duration={600}
              aria-label="scroll to section"
              role="button"
            >
              Reserve
            </Link>
          </Button>
        </div>
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
