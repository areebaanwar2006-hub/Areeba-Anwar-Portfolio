import './globals.css';

export const metadata = {
  title: 'Areeba Anwar — Graphic Designer',
  description: 'Brand identities, ecommerce stories, illustration and digital experiences by Areeba Anwar.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
