import ContactDialog from './booking/contact-dialog';
import BookingCard from './booking/booking-card';
import { useEffect, useRef } from 'react';
import { useNavStore } from '@/store/navStore';
import { useInView } from 'framer-motion';

export default function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
  });

  const setActive = useNavStore((state) => state.setActive);

  useEffect(() => {
    if (isInView) {
      setActive('Reservation');
    }
  }, [isInView, setActive]);

  return (
    <section
      className="grid sm:grid-cols-[1fr_minmax(300px,_0.8fr)] lg:grid-cols-[1fr_minmax(300px,_0.7fr)] gap-10 sm:gap-5 max-lg:px-2 lg:container min-h-[70dvh] items-center max-sm:my-20"
      id="Reservation"
      ref={ref}
    >
      <ContactDialog />
      <article className="px-5">
        <p className="text-lg max-md:text-center">
          Holiday Hill is a comfortable cottage with a fully equipped kitchen,
          living room bedroom and apartment (for children), where our guests
          will find everything they need to relax and rest in the forests and
          meadows of the Sumava Forest. The cottage has two terraces, surrounded
          by a garden of 1500 m, in which everyone will find space to relax.
          Another attraction in the garden is the POOL and SAUNA (reservation
          and extra charge).
        </p>
      </article>
      <BookingCard />
    </section>
  );
}
