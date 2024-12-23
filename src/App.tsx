import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Snowfall } from './components/Snowfall';
import { theme } from './styles/theme';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.background});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  text-shadow: ${({ theme }) => theme.shadows.glow};
  margin-bottom: 2rem;
`;

function App() {
  return (
    <Container>
      <Snowfall />
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Frohe Weihnachten!
      </Title>
      {/* Weitere Komponenten werden hier hinzugefügt */}
    </Container>
  );
}

export default App; 