import Link from "next/link";
import { getCannabisArticles, groupByCategory, formatDate } from "@/lib/articles";
import { CANNABIS_TAGLINE } from "@/lib/taglines";

export const metadata = {
  title: "Cannabis and Cannabinoid Current Events",
  description:
    "Editorial coverage of policy, science, industry, and market developments across cannabis, hemp, and cannabinoids.",
};

const categoryOrder = [
  "Policy and Regulation",
  "Science and Research",
  "Industry News",
  "Market Trends",
];

export default function CannabisIndex() {
  const articles = getCannabisArticles();
  const grouped = groupByCategory(articles);
  const cats = categoryOrder.filter((c) => grouped[c]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
        Cannabis and Cannabinoid Current Events
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">
        Reporting on policy, science, industry, and markets.
      </h1>
      <p className="border-l-2 border-brand-text pl-4 italic text-brand-muted mb-10 max-w-prose">
        {CANNABIS_TAGLINE}
      </p>

      {cats.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="font-serif text-2xl mb-5 border-b border-brand-border pb-2">
            {cat}
          </h2>
          <ul className="space-y-6">
            {grouped[cat].map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/cannabis/${a.slug}`}
                  className="block hover:no-underline group"
                >
                  <h3 className="font-serif text-xl group-hover:underline">{a.title}</h3>
                  <p className="text-xs text-brand-muted mt-1">
                    {a.byline} · {formatDate(a.date)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {articles.length === 0 && (
        <p className="text-brand-muted">No articles available.</p>
      )}
    </div>
  );
}
