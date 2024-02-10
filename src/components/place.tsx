import { useNavStore } from '@/store/navStore';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Place() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 'some' });

  const setActive = useNavStore((state) => state.setActive);

  useEffect(() => {
    if (isInView) {
      setActive('Place');
    }
  }, [isInView, setActive]);
  return (
    <section id="Place" ref={ref} className="min-h-screen ">
      Place
    </section>
  );
}
