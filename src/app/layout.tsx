import type { Metadata } from 'next';
import RootStyleRegistry from './emotion';

export const metadata: Metadata = {
  title: 'Frohe Weihnachten',
  description: 'Eine festliche Weihnachtsseite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
