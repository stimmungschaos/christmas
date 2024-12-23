'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

interface Wish {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

const WishContainer = styled.div`
  max-width: 600px;
  width: 90%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
`;

const WishForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const WishCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

const WishAuthor = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-top: 0.5rem;
`;

export function WishList() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim() || !author.trim()) return;

    const wish: Wish = {
      id: Date.now().toString(),
      text: newWish.trim(),
      author: author.trim(),
      createdAt: new Date(),
    };

    setWishes((prev) => [wish, ...prev]);
    setNewWish('');
  };

  return (
    <WishContainer>
      <WishForm onSubmit={handleSubmit}>
        <Input
          placeholder="Dein Name..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Input
          placeholder="Dein Weihnachtswunsch..."
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          required
        />
        <Button type="submit">Wunsch teilen ✨</Button>
      </WishForm>

      <AnimatePresence>
        {wishes.map((wish) => (
          <WishCard
            key={wish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <p>{wish.text}</p>
            <WishAuthor>- {wish.author}</WishAuthor>
          </WishCard>
        ))}
      </AnimatePresence>
    </WishContainer>
  );
} 