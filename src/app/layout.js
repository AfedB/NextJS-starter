// src/app/layout.js
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Mon application',
  description: 'Description de mon application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-gray-100 p-4">
          <nav className="container mx-auto flex gap-4">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            <Link href="/about" className="hover:underline">
              À propos
            </Link>
            <Link href="/login" className="hover:underline">
              Connexion
            </Link>
            <Link href="/register" className="hover:underline">
              Inscription
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}