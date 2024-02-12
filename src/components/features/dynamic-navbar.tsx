import { Button } from '../ui/button';
import { Link } from 'react-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavStore } from '@/store/navStore';

export default function DynamicNavbar() {
  const active = useNavStore((state) => state.active);

  const navItems = ['Rooms', 'Reservation', 'Contact'] as const;

  return (
    <nav
      className={`bg-accent rounded-full h-14 w-max flex items-center overflow-hidden fixed bottom-14 sm:top-10 left-1/2 -translate-x-1/2 z-50 px-2 
      `}
    >
      <motion.div
        className="flex overflow-hidden rounded-full"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        <ul className="flex gap-1 items-center w-full px-2 ">
          {navItems.map((item, index) => {
            return (
              <motion.li key={index} className="relative" layout>
                <Button
                  variant={'ghost'}
                  className="font-semibold text-base rounded-full"
                  asChild
                >
                  <Link
                    to={item}
                    spy={true}
                    offset={-100}
                    smooth={true}
                    duration={600}
                    aria-label="scroll to section"
                    role="button"
                  >
                    {item}
                  </Link>
                </Button>

                <AnimatePresence>
                  {item === active && (
                    <motion.span
                      className="bg-gray-200 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                      layoutId="active"
                      initial={{ x: -50 }}
                      animate={{ x: 0 }}
                      exit={{ x: -100 }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
}
