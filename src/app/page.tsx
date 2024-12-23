'use client';

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Snowfall } from '@/components/Snowfall';
import { MessageCreator } from '@/components/MessageCreator';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.background});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  text-shadow: ${({ theme }) => theme.shadows.glow};
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

export default function Home() {
  return (
    <Container>
      <Snowfall />
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Frohe Weihnachten! 🎄
      </Title>
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Erstelle eine persönliche Weihnachtsnachricht und teile sie mit deinen Liebsten
      </Subtitle>
      <MessageCreator />
    </Container>
  );
}
