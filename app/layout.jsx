import './globals.css';

export const metadata = {
  title: 'Unas flores para vos 💛',
  description: 'Un pequeño regalo digital de flores amarillas.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d0b06'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
