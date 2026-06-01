import Link from "next/link";
import { getWellnessArticles, groupByCategory, formatDate } from "@/lib/articles";
import { WELLNESS_TAGLINE } from "@/lib/taglines";

export const metadata = {
  title: "Health and Wellness Articles",
  description:
    "Editorial coverage of sleep, stress, recovery, mindfulness, and nutrition for general readers.",
};

const categoryOrder = ["Sleep", "Stress", "Recovery", "Mindfulness", "Nutrition"];

export default function WellnessIndex() {
  const articles = getWellnessArticles();
  const grouped = groupByCategory(articles);
  const cats = categoryOrder.filter((c) => grouped[c]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
        Health and Wellness
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">
        Editorial coverage of everyday well-being.
      </h1>
      <p className="border-l-2 border-brand-text pl-4 italic text-brand-muted mb-10 max-w-prose">
        {WELLNESS_TAGLINE}
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
                  href={`/wellness/${a.slug}`}
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
