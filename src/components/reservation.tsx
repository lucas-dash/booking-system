import ContactDialog from './booking/contact-dialog';
import BookingCard from './booking/booking-card';
import { useEffect, useRef } from 'react';
import { useNavStore } from '@/store/navStore';
import { useInView } from 'framer-motion';
import {
  CarFront,
  Coffee,
  EggFried,
  Tv,
  Waves,
  Wifi,
  Wine,
} from 'lucide-react';

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
      className="grid md:grid-cols-[1fr_minmax(300px,_0.8fr)] lg:grid-cols-[1fr_minmax(300px,_0.7fr)] gap-10 sm:gap-5 max-lg:px-2 lg:container min-h-[70dvh] items-center max-sm:my-20"
      id="Reservation"
      ref={ref}
    >
      <ContactDialog />
      <article className="px-5 flex flex-col gap-5 md:gap-10">
        <p className="text-lg max-sm:text-center">
          Holiday Hill is a comfortable cottage with a fully equipped kitchen,
          living room bedroom and apartment (for children), where our guests
          will find everything they need to relax and rest in the forests and
          meadows of the Sumava Forest. The cottage has two terraces, surrounded
          by a garden of 1500 m, in which everyone will find space to relax.
          Another attraction in the garden is the POOL and SAUNA (reservation
          and extra charge).
        </p>

        <section>
          <h4 className="font-medium text-2xl pb-4">What this place offers</h4>
          <div className="grid min-[420px]:grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <Wifi /> <span className="text-lg">Wifi</span>
            </div>
            <div className="flex items-center gap-1">
              <Tv /> <span className="text-lg">TV</span>
            </div>
            <div className="flex items-center gap-1">
              <EggFried /> <span className="text-lg">Breakfast</span>
            </div>
            <div className="flex items-center gap-1">
              <CarFront /> <span className="text-lg">Free parking</span>
            </div>
            <div className="flex items-center gap-1">
              <Waves /> <span className="text-lg">Swimming pool</span>
            </div>
            <div className="flex items-center gap-1">
              <Coffee /> <span className="text-lg">Coffee maker</span>
            </div>
            <div className="flex items-center gap-1">
              <Wine /> <span className="text-lg">Wine glasses</span>
            </div>
          </div>
        </section>
      </article>
      <BookingCard />
    </section>
  );
}
