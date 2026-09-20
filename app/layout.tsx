import type { Metadata } from "next";
import "./globals.css";
import { rootMetadata } from "@/lib/seo";
import { Navbar, Footer } from "@/components/site";
import { ScrollReveal } from "@/components/reveal";

export const metadata: Metadata = rootMetadata;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TEAM PETRA",
    brand: { "@type": "Brand", name: "PROPETRA" },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PROPETRA",
    applicationCategory: "BusinessApplication",
    description: "A property management system for hospitality operations.",
    operatingSystem: "Web",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PropetraBangladesh",
    description: "Public business and product website for PROPETRA.",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollReveal />
        {structuredData.map((item, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
        ))}
      </body>
    </html>
  );
}
