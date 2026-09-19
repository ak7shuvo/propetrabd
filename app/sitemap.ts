import type { MetadataRoute } from "next";
const routes = ["", "/product", "/features", "/solutions", "/solutions/hotels", "/solutions/resorts", "/solutions/boutique-properties", "/solutions/guest-houses", "/solutions/serviced-apartments", "/how-it-works", "/why-propetra", "/about", "/resources", "/contact", "/request-demo"];
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!base) return [];
  return routes.map((path) => ({ url: `${base}${path || "/"}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
