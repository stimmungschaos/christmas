'use client';

import { useParams } from 'next/navigation';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Snowfall } from '@/components/Snowfall';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { SpotifyPlayer } from '@/components/SpotifyPlayer';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.background});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const MessageCard = styled(motion.div)`
  max-width: 600px;
  width: 90%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  position: relative;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin: 2rem 0;
  line-height: 1.6;
`;

const Signature = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-top: 2rem;
`;

const Decorations = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '🎄';
    position: absolute;
    font-size: 2rem;
  }
  
  &::before {
    top: 1rem;
    left: 1rem;
  }
  
  &::after {
    bottom: 1rem;
    right: 1rem;
  }
`;

const BackButton = styled(Link)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
`;

interface MessageData {
  to: string;
  from: string;
  message: string;
  spotifyTrackId: string;
}

export default function MessagePage() {
  const params = useParams();
  const [message, setMessage] = useState<MessageData | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      if (!params.id) return;

      try {
        const response = await fetch(`/api/messages?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Nachricht nicht gefunden');
        }

        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error('Fehler beim Laden der Nachricht:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [params.id]);

  if (error) {
    return (
      <Container>
        <Snowfall />
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1>Oops! 🎅</h1>
          <p>Diese Weihnachtsnachricht scheint nicht zu existieren.</p>
          <BackButton href="/">Zurück zur Startseite</BackButton>
        </ErrorMessage>
      </Container>
    );
  }

  if (!message) return null;

  return (
    <Container>
      <Snowfall />
      <BackButton href="/">← Zurück</BackButton>
      <MessageCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Decorations />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Frohe Weihnachten, {message.to}! 🎄
        </motion.h1>
        <Message>{message.message}</Message>
        <Signature>- {message.from}</Signature>
      </MessageCard>
      {message && <SpotifyPlayer trackId={message.spotifyTrackId} />}
    </Container>
  );
} 