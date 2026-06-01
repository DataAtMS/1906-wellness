import { notFound } from "next/navigation";
import Link from "next/link";
import { getCannabisArticles, getArticleBySlug, formatDate } from "@/lib/articles";
import { renderMarkdown } from "@/lib/markdown";
import { CANNABIS_TAGLINE } from "@/lib/taglines";

export async function generateStaticParams() {
  return getCannabisArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticleBySlug("cannabis", slug);
  if (!a) return { title: "Not Found" };
  return {
    title: a.title,
    description: a.body.slice(0, 160).replace(/\s+/g, " "),
  };
}

export default async function CannabisArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticleBySlug("cannabis", slug);
  if (!a) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <p className="border-l-2 border-brand-text pl-4 italic text-brand-muted mb-8 text-sm max-w-prose">
        {CANNABIS_TAGLINE}
      </p>
      <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
        Cannabis and Cannabinoid Current Events · {a.category}
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-3">{a.title}</h1>
      <p className="text-sm text-brand-muted mb-10 pb-6 border-b border-brand-border">
        By {a.byline} · {formatDate(a.date)}
      </p>
      <div
        className="prose-article max-w-prose"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(a.body) }}
      />
      <p className="mt-12 pt-6 border-t border-brand-border">
        <Link href="/cannabis" className="text-sm underline">
          ← Back to Cannabis and Cannabinoid Current Events
        </Link>
      </p>
    </article>
  );
}
