'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

const SnowflakeElement = styled(motion.div)`
  position: fixed;
  color: white;
  user-select: none;
  z-index: 1;
`;

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSnowflake: Snowflake = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 4,
      };

      setSnowflakes((prev) => [...prev, newSnowflake]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setSnowflakes((prev) => prev.filter((flake) => Date.now() - flake.id < 6000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <AnimatePresence>
      {snowflakes.map((flake) => (
        <SnowflakeElement
          key={flake.id}
          initial={{ y: -20, x: `${flake.left}vw`, opacity: 0.8 }}
          animate={{ y: '100vh' }}
          exit={{ opacity: 0 }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            ease: 'linear',
          }}
        >
          ❄
        </SnowflakeElement>
      ))}
    </AnimatePresence>
  );
}; 