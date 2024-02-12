import { useEffect, useRef } from 'react';
import Contact from './contact';
import Place from './place';
import { useNavStore } from '@/store/navStore';
import { useInView } from 'framer-motion';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.4,
  });

  const setActive = useNavStore((state) => state.setActive);

  useEffect(() => {
    if (isInView) {
      setActive('Contact');
    }
  }, [isInView, setActive]);

  return (
    <section
      ref={ref}
      className="min-h-[80dvh] flex flex-col gap-6 my-10 lg:container"
      id="Contact"
    >
      <Contact />
      <Place />
    </section>
  );
}
