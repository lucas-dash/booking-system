import { useNavStore } from '@/store/navStore';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 'some',
    // margin: '0px -350px -300px 0px',
    margin: '-40%',
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

      <div className="grid sm:grid-cols-2 gap-2 mt-2">
        <section className="flex flex-col gap-2 max-h-[1200px]">
          <div className="rounded-2xl overflow-hidden max-h-[700px]">
            <img
              src="/src/assets/room1.WEBP"
              alt="first room"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden ">
            <img
              src="/src/assets/room2.WEBP"
              alt="second room"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-2 h-full">
          <article className="bg-slate-200 h-full rounded-2xl p-2">
            <h3>Info</h3>
          </article>
          <article className="bg-slate-200 h-full rounded-2xl p-2">
            <h3>Info</h3>
          </article>
          <article className="bg-slate-200 h-full rounded-2xl p-2">
            <h3>Info</h3>
          </article>
        </section>
      </div>

      <div className="rounded-2xl overflow-hidden mt-2 max-h-[700px]">
        <img
          src="/src/assets/room3.WEBP"
          alt="third room"
          className="w-full h-full object-cover aspect-video"
        />
      </div>
    </section>
  );
}
