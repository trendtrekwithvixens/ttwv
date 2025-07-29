import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailPopup from '@/components/EmailPopup';

export const metadata: Metadata = {
  title: 'Affiliate Store - Best Deals & Reviews',
  description: 'Find the best products with exclusive deals and comprehensive reviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <EmailPopup />
      </body>
    </html>
  );
}