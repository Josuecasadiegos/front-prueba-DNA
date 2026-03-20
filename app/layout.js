'use client';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';


import { Toaster } from 'react-hot-toast';
import SocketListener from '@/components/SocketListener';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DNA Music - Gestión',
  description: 'Sistema de administración',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Toaster position="top-right" />
        
        {/* 🔥 ESCUCHA GLOBAL DE SOCKET */}
        <SocketListener />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}