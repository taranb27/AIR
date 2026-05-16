import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "A.I.R — AI & Automation Consultants for UK Service Businesses",
    template: "%s | A.I.R",
  },
  description:
    "A.I.R is a UK-based AI and automation consultancy for service businesses. We build AI voice agents, lead generation systems, workflow automation, and client intake tools for estate agents, law firms, recruitment agencies, IFAs, and hospitality groups.",

  keywords: [
    "AI automation UK service businesses",
    "AI voice agent UK",
    "estate agent AI automation",
    "law firm AI automation UK",
    "recruitment agency AI tools",
    "IFA AI automation UK",
    "hospitality AI solutions UK",
    "AI lead generation UK",
    "client intake automation",
    "workflow automation UK",
    "AI consulting UK",
    "business automation AI UK",
    "AI strategy UK small business",
    "conversational AI UK",
    "AI for professional services UK",
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
    title: "A.I.R — AI & Automation Consultants for UK Service Businesses",
    description:
      "UK-based AI and automation consultancy for service businesses. AI voice agents, lead gen, workflow automation, and client intake for estate agents, law firms, recruitment, IFAs, and hospitality.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A.I.R — AI & Automation Consultants for UK Service Businesses",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "A.I.R — AI & Automation Consultants for UK Service Businesses",
    description:
      "UK-based AI and automation consultancy for service businesses. AI voice agents, lead gen, workflow automation, and client intake for estate agents, law firms, recruitment, IFAs, and hospitality.",
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
                "UK-based AI and automation consultancy for service businesses. Services include AI voice agents, lead generation, client intake automation, document automation, workflow automation, and AI strategy for estate agents, law firms, recruitment agencies, IFAs, and hospitality groups.",
              areaServed: {
                "@type": "Country",
                name: "United Kingdom",
              },
              serviceType: [
                "AI Voice Agents",
                "AI Lead Generation",
                "Client Intake Automation",
                "Document Automation",
                "Workflow Automation",
                "CRM Integration",
                "AI Strategy & Consulting",
                "AI Dashboards & Analytics",
                "Follow-Up Sequences",
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Business Automation",
                "AI Voice Agents",
                "Lead Generation Automation",
                "Conversational AI",
                "Process Automation",
                "Estate Agent Technology",
                "Legal Technology",
                "Recruitment Technology",
                "Hospitality Technology",
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
