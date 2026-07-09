import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'CoffeeVerse — 3D Coffee Ecommerce',
  description: 'Premium full-stack coffee ecommerce website built with Next.js, Tailwind CSS, Express and MongoDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" toastOptions={{ style: { background: '#1c1009', color: '#fff7ed', border: '1px solid rgba(255,255,255,.12)' } }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
