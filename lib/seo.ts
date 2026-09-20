import type { Metadata } from "next";

const siteName = "PETRA Bangladesh";
const siteDescription = "PETRA is a modern property management system for hospitality operations, bringing reservations, rooms, guests, front desk, housekeeping, billing and reporting into one platform.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | PETRA`,
      description,
      type: "website",
      siteName,
      url: path,
    },
    twitter: { card: "summary", title: `${title} | PETRA`, description },
  };
}

export const rootMetadata: Metadata = {
  title: { default: "PETRA — Property Management, Simplified", template: "%s | PETRA" },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "PETRA — Property Management, Simplified",
    description: siteDescription,
    type: "website",
    siteName,
    url: "/",
  },
  twitter: { card: "summary", title: "PETRA — Property Management, Simplified", description: siteDescription },
  robots: { index: true, follow: true },
};
