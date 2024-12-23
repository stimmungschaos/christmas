'use client';

import styled from '@emotion/styled';

const MusicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const MusicCard = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    background: ${({ isSelected, theme }) =>
      isSelected ? theme.colors.secondary : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const PreviewFrame = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

// Beliebte Weihnachtslieder auf Spotify
const songs = [
  {
    id: '0bYg9bo50gSsH3LtXe2SQn',
    title: 'All I Want for Christmas Is You',
    artist: 'Mariah Carey',
    icon: '🎄'
  },
  {
    id: '2FRnf9qhLbvw8fu4IBXx78',
    title: 'Last Christmas',
    artist: 'Wham!',
    icon: '🎁'
  },
  {
    id: '7inXu0Eaeg02VsM8kHNvzM',
    title: 'Jingle Bell Rock',
    artist: 'Bobby Helms',
    icon: '🔔'
  },
  {
    id: '11s4KYi8UTs0kZJj9TqAal',
    title: 'Stille Nacht',
    artist: 'Andrea Berg',
    icon: '⭐'
  }
];

interface MusicSelectorProps {
  onSelect: (id: string) => void;
  selected: string;
}

export function MusicSelector({ onSelect, selected }: MusicSelectorProps) {
  return (
    <div>
      <h3>Wähle die Hintergrundmusik</h3>
      <MusicGrid>
        {songs.map((song) => (
          <MusicCard
            key={song.id}
            isSelected={selected === song.id}
            onClick={() => onSelect(song.id)}
            type="button"
          >
            <span style={{ fontSize: '2rem' }}>{song.icon}</span>
            <div>
              <div>{song.title}</div>
              <small style={{ opacity: 0.8 }}>{song.artist}</small>
            </div>
          </MusicCard>
        ))}
      </MusicGrid>
      {selected && (
        <PreviewFrame>
          <iframe
            src={`https://open.spotify.com/embed/track/${selected}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '8px' }}
          />
        </PreviewFrame>
      )}
    </div>
  );
} 