import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  byline: string;
  date: string; // ISO YYYY-MM-DD (treated as ET editorial date)
  category: string;
  body: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readSection(section: "cannabis" | "wellness"): Article[] {
  const dir = path.join(CONTENT_ROOT, section);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const items: Article[] = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: f.replace(/\.md$/, ""),
      title: String(data.title ?? ""),
      byline: String(data.byline ?? ""),
      date: String(data.date ?? ""),
      category: String(data.category ?? ""),
      body: content.trim(),
    };
  });
  // Newest first.
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return items;
}

export function getCannabisArticles(): Article[] {
  return readSection("cannabis");
}

export function getWellnessArticles(): Article[] {
  return readSection("wellness");
}

export function getArticleBySlug(
  section: "cannabis" | "wellness",
  slug: string,
): Article | null {
  const items =
    section === "cannabis" ? getCannabisArticles() : getWellnessArticles();
  return items.find((a) => a.slug === slug) ?? null;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00-04:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
}

export function groupByCategory(items: Article[]): Record<string, Article[]> {
  return items.reduce<Record<string, Article[]>>((acc, a) => {
    (acc[a.category] ||= []).push(a);
    return acc;
  }, {});
}
