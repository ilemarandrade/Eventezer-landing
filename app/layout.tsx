import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { CountryProvider } from '@/components/providers/country-provider';
import { CountrySelectDialog } from '@/components/landing/country-select-dialog';
import './globals.css';
import { FacebookPixel } from '@/components/pixel/FaceboookPixel';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eventezer — Gestión de tickets para eventos',
  description:
    'Plataforma de gestión de tickets para organizadores: suscripción + comisión solo en ventas aprobadas.',
  icons: {
    icon: [
      { url: '/logos/logo-dark.ico', media: '(prefers-color-scheme: light)' },
      { url: '/logos/logo-light.ico', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9331970861016684"></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9331970861016684"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider>
          <CountryProvider>
            <FacebookPixel />
            {children}
            <CountrySelectDialog />
            <Toaster richColors position="top-center" closeButton />
          </CountryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
