import type { Metadata } from 'next';
import { Inter, Baloo_2, Hind } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const baloo = Baloo_2({ subsets: ['latin'], variable: '--font-baloo' });
const hind = Hind({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind' 
});

export const metadata: Metadata = {
  title: 'BazaarBridge - Connect Street Food Vendors with Suppliers',
  description: 'A marketplace platform connecting Indian street food vendors with local raw material suppliers. Find ingredients, compare prices, and manage your food business efficiently.',
  keywords: 'street food, vendors, suppliers, Indian food, marketplace, ingredients, raw materials',
  authors: [{ name: 'BazaarBridge Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FF6B35',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable} ${hind.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-hind bg-background text-text antialiased min-h-screen">
        <div id="recaptcha-container"></div>
        {children}
      </body>
    </html>
  );
}
