import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Congo History Cloud — Racontons l'histoire du Congo à travers le Cloud",
    template: "%s · Congo History Cloud",
  },
  description:
    "Plateforme numérique interactive de mémoire et d'histoire de la République du Congo (Congo-Brazzaville), de l'indépendance en 1960 à aujourd'hui. Découvrez les événements, personnalités, articles, galerie et carte interactive.",
  keywords: [
    "Congo",
    "Congo-Brazzaville",
    "histoire du Congo",
    "République du Congo",
    "Brazzaville",
    "indépendance 1960",
    "timeline Congo",
    "patrimoine africain",
    "histoire africaine",
  ],
  authors: [{ name: "Congo History Cloud" }],
  openGraph: {
    title: "Congo History Cloud",
    description:
      "Explorez l'histoire de la République du Congo, de 1960 à aujourd'hui — événements, personnalités, articles, galerie et carte interactive.",
    siteName: "Congo History Cloud",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Congo History Cloud",
    description: "L'histoire du Congo de 1960 à aujourd'hui.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <SonnerToaster position="bottom-right" richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
