import { useNavStore } from '@/store/navStore';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2,
  });

  const setActive = useNavStore((state) => state.setActive);

  useEffect(() => {
    if (isInView) {
      setActive('Rooms');
    }
  }, [isInView, setActive]);

  return (
    <section id="Rooms" ref={ref} className="max-lg:px-2 my-5 lg:container">
      <div className="w-full rounded-full h-12 bg-slate-200 flex items-center justify-center">
        <h2 className="font-semibold text-2xl">Discover Our Rooms</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-2 mt-2">
        <section className="flex flex-col gap-2 max-h-[1200px]">
          <div className="rounded-2xl overflow-hidden h-full">
            <img
              src="/src/assets/room2.WEBP"
              alt="first room"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-2 h-full">
          <article className="bg-slate-200 h-full rounded-2xl p-5 flex items-center">
            <p className="sm:text-lg font-medium">
              This room captures a modern and elegant open plan living space
              that seamlessly connects the bedroom, living area and kitchen, all
              in a harmonious and natural colour palette. The room is flooded
              with natural light that streams in through the impressive
              floor-to-ceiling windows, which offer spectacular views of the
              dense, green forest that creates a serene backdrop to the modern
              interior.
            </p>
          </article>

          <article className="bg-slate-200 h-full rounded-2xl p-5 flex items-center">
            <p className="sm:text-lg font-medium ">
              This room pictured below combines modern elegance with nature,
              with high ceilings, wooden beams and huge windows overlooking the
              forest. A cozy fireplace, plush sofas and a sleek kitchen create
              the perfect combination for relaxing and entertaining in this
              cottage living space.
            </p>
          </article>
        </section>
      </div>

      <div className="rounded-2xl overflow-hidden mt-2 max-h-[700px]">
        <img
          src="/src/assets/room1.WEBP"
          alt="third room"
          className="w-full h-full object-cover aspect-video"
        />
      </div>
    </section>
  );
}
