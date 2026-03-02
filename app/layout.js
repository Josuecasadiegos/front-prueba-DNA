// src/app/layout.js   ← asegúrate que sea ESTA ruta

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';  // ← este import es crítico – debe ser ./globals.css si globals.css está en src/app/

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DNA Music - Gestión',
  description: 'Sistema de administración',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
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