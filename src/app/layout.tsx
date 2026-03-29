import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dolci e Sapori Cake & Kitchen | Restaurante Italiano en Sosúa",
  description:
    "Descubre los sabores italianos con alma caribeña en Sosúa, República Dominicana. Pasteles artesanales, cocina italiana auténtica y un ambiente acogedor. ¡Reserva tu mesa ahora!",
  keywords: [
    "Dolci e Sapori",
    "restaurante italiano",
    "Sosúa",
    "República Dominicana",
    "cake shop",
    "pastelería",
    "cocina italiana",
    "cannoli",
    "tiramisu",
    "pasta",
    "desayuno",
  ],
  authors: [{ name: "Dolci e Sapori Cake & Kitchen" }],
  icons: {
    icon: "/images/logo-restaurant.png",
  },
  openGraph: {
    title: "Dolci e Sapori Cake & Kitchen | Restaurante Italiano en Sosúa",
    description:
      "Sabores italianos con alma caribeña. Pasteles artesanales, cocina italiana auténtica en el corazón de Sosúa.",
    siteName: "Dolci e Sapori Cake & Kitchen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
