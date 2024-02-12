import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function useCounter(numb: number, dura: number) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numb, { duration: dura });

    return animation.stop;
  }, [count, dura, numb]);

  return <motion.span>{rounded}</motion.span>;
}
