import type { MetadataRoute } from "next";
import { getCannabisArticles, getWellnessArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/cannabis`, lastModified: now },
    { url: `${SITE_URL}/cannabis-links`, lastModified: now },
    { url: `${SITE_URL}/wellness`, lastModified: now },
    { url: `${SITE_URL}/wellness-links`, lastModified: now },
  ];
  for (const a of getCannabisArticles()) {
    base.push({ url: `${SITE_URL}/cannabis/${a.slug}`, lastModified: new Date(a.date) });
  }
  for (const a of getWellnessArticles()) {
    base.push({ url: `${SITE_URL}/wellness/${a.slug}`, lastModified: new Date(a.date) });
  }
  return base;
}
