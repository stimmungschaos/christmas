'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const SpotifyContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 8px;
`;

interface SpotifyPlayerProps {
  trackId: string;
}

export function SpotifyPlayer({ trackId }: SpotifyPlayerProps) {
  return (
    <SpotifyContainer>
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="300"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '8px' }}
      />
    </SpotifyContainer>
  );
} 