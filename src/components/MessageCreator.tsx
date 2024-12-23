'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { MusicSelector } from './MusicSelector';

const Form = styled.form`
  max-width: 600px;
  width: 90%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const ShareLink = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  word-break: break-all;
`;

export function MessageCreator() {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMusic, setSelectedMusic] = useState('/music/jingle-bells.mp3');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: to.trim(),
          from: from.trim(),
          message: message.trim(),
          musicUrl: selectedMusic,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen der Nachricht');
      }

      const data = await response.json();
      const link = `${window.location.origin}/message/${data.id}`;
      setShareLink(link);
      setTo('');
      setFrom('');
      setMessage('');
    } catch (err) {
      setError('Etwas ist schief gelaufen. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Erstelle deine Weihnachtsnachricht</h2>
      <Input
        placeholder="An wen ist die Nachricht?"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      />
      <Input
        placeholder="Von wem ist die Nachricht?"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
      />
      <TextArea
        placeholder="Deine Weihnachtsnachricht..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <MusicSelector onSelect={setSelectedMusic} selected={selectedMusic} />
      <Button type="submit">Nachricht erstellen ✨</Button>

      {shareLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShareLink>
            <p>Teile diesen Link:</p>
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              {shareLink}
            </a>
          </ShareLink>
        </motion.div>
      )}
    </Form>
  );
} 