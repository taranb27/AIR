import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://airdevconsultancy.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "A.I.R — AI & Robotics Consultants for Hospitality | UK",
    template: "%s | A.I.R",
  },
  description:
    "A.I.R is a UK-based AI and Robotics consultancy specialising in hospitality. We build conversational AI, operations automation, and robotics systems for hotels, restaurants, and hospitality groups.",

  keywords: [
    "AI consulting hospitality UK",
    "hotel AI solutions",
    "restaurant automation AI",
    "hospitality technology consulting",
    "AI robotics hospitality UK",
    "hotel chatbot UK",
    "hospitality operations automation",
    "conversational AI hotel",
    "AI strategy hospitality",
    "robotics hospitality UK",
    "hotel technology consultant",
    "AI for restaurants UK",
  ],

  authors: [{ name: "A.I.R", url: SITE_URL }],
  creator: "A.I.R",
  publisher: "A.I.R",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "A.I.R",
    title: "A.I.R — AI & Robotics Consultants for Hospitality",
    description:
      "UK-based AI and Robotics consultancy specialising in hospitality. Conversational AI, operations automation, and robotics for hotels and restaurants.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A.I.R — AI & Robotics Consultants for Hospitality",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A.I.R — AI & Robotics Consultants for Hospitality",
    description:
      "UK-based AI and Robotics consultancy specialising in hospitality. Conversational AI, operations automation, and robotics for hotels and restaurants.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    // Add your Google Search Console verification token here when you have it:
    // google: "your-token-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        {/* JSON-LD structured data — tells Google exactly what this business is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "A.I.R",
              alternateName: "Artificial Intelligence & Robotics",
              url: SITE_URL,
              email: "taran@airdevconsultancy.co.uk",
              description:
                "UK-based AI and Robotics consultancy specialising in hospitality technology. Services include conversational AI, operations automation, and robotics integration.",
              areaServed: {
                "@type": "Country",
                name: "United Kingdom",
              },
              serviceType: [
                "AI Strategy & Consulting",
                "Conversational AI",
                "Operations Automation",
                "Robotics Integration",
                "Data & Analytics",
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Robotics",
                "Hospitality Technology",
                "Conversational AI",
                "Process Automation",
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
