import { Button } from '../ui/button';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useNavStore } from '@/store/navStore';
import { useState } from 'react';

export default function DynamicNavbar() {
  const { active, setActive } = useNavStore();
  const navItems = ['Hero', 'Rooms', 'Reservation', 'Place'] as const;
  const [navX, setNavX] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setNavX(-(latest / 20));
  });

  return (
    <nav
      className={`bg-accent rounded-full h-14 max-w-[300px] w-full flex items-center overflow-hidden fixed bottom-20 sm:top-10 left-1/2 -translate-x-1/2 z-50 px-2`}
    >
      <motion.div
        className="flex overflow-x-hidden rounded-full cursor-grab"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.ul
          animate={{ x: navX }}
          className="flex gap-1 items-center w-full px-2"
          drag="x"
          dragConstraints={{ right: 0, left: -150 }}
        >
          {navItems.map((item, index) => {
            return (
              <motion.li key={index} className="relative">
                <Button
                  variant={'ghost'}
                  onClick={() => setActive(item)}
                  className="font-semibold text-base rounded-full"
                >
                  {item}
                </Button>
                {item === active && (
                  <motion.span
                    className="bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="active"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </nav>
  );
}
