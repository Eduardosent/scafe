import type { Metadata } from "next";
import { Poppins, Geist_Mono, Arvo } from "next/font/google"; // Importamos Poppins
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { AuthProvider } from "@/providers";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getAppMessages, getUserLocale } from "@/config/locale";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arvo = Arvo({ 
  weight: ["400",  "700"],
  subsets: ['latin'],
  variable: '--font-arvo', // Aquí solo creás el "apodo" de la fuente
});

export const metadata: Metadata = {
  // Título: Ideal entre 50-60 caracteres. Incluye ubicación para SEO local.
  title: "El Sendero Café | Cafeteria en San Juan Talpa, La Paz, El Salvador",
  
  // Descripción: Entre 140-160 caracteres. Debe invitar a la acción.
  description: "Disfruta de la tranquilidad y el auténtico sabor del café salvadoreño en El Sendero Café. Gastronomía artesanal y el mejor ambiente en San Juan Talpa, La Paz.",
  
  // Palabras clave para buscadores
  keywords: [
    "Café de especialidad El Salvador", 
    "Restaurante en San Juan Talpa", 
    "Mejor café La Paz El Salvador", 
    "Gastronomía artesanal", 
    "El Sendero Café"
  ],

  // Open Graph: Cómo se ve en redes sociales (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "El Sendero Café | Tranquilidad y Sabor",
    description: "Viví una experiencia única con nuestro café de especialidad y platillos artesanales en el corazón de San Juan Talpa.",
    url: "https://elsenderocafe.com", // Reemplaza con tu dominio real
    siteName: "El Sendero Café",
    locale: "es_SV",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Crea una imagen de 1200x630px en tu carpeta public
        width: 1200,
        height: 630,
        alt: "Ambiente acogedor de El Sendero Café",
      },
    ],
  },

  // Twitter Card: Optimización para X/Twitter
  twitter: {
    card: "summary_large_image",
    title: "El Sendero Café | Café de Especialidad",
    description: "El punto de encuentro perfecto para los amantes del buen café en La Paz.",
    images: ["/og-image.jpg"],
  },

  // Robots: Instrucciones para Google
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getUserLocale();
  const messages = await getAppMessages(locale);
  
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} ${arvo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
