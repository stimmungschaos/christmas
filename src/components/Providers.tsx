'use client';

import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
} 