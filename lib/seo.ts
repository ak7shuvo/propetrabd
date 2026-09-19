import type { Metadata } from "next";

const siteName = "PropetraBangladesh";
const siteDescription = "PROPETRA is a modern property management system for hospitality operations, bringing reservations, rooms, guests, front desk, housekeeping, billing and reporting into one platform.";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | PROPETRA`,
      description,
      type: "website",
      siteName,
      url: path,
    },
    twitter: { card: "summary", title: `${title} | PROPETRA`, description },
  };
}

export const rootMetadata: Metadata = {
  title: { default: "PROPETRA — Property Management, Simplified", template: "%s | PROPETRA" },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "PROPETRA — Property Management, Simplified",
    description: siteDescription,
    type: "website",
    siteName,
    url: "/",
  },
  twitter: { card: "summary", title: "PROPETRA — Property Management, Simplified", description: siteDescription },
  robots: { index: true, follow: true },
};
