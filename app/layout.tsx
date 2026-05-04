import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bet Fuego — Ignite Your Game",
  description: "Casino online y apuestas deportivas. Regístrate y recibe tu bono de bienvenida.",
  keywords: ["casino online", "apuestas deportivas", "Argentina", "bet", "fuego"],
  openGraph: {
    title: "Bet Fuego — Ignite Your Game",
    description: "Casino online y apuestas deportivas en Argentina.",
    url: "https://betfuego.com",
    siteName: "Bet Fuego",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#E0E0E0] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
