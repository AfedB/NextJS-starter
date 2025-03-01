// src/app/layout.js
import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Mon application',
  description: 'Description de mon application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className='relative'>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-gray-200 p-4">
            <p>this is the footer</p>
          </footer>
        </div>
      </body>
    </html>
  );
}