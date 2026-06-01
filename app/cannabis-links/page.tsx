import { cannabisLinks } from "@/lib/links";
import { CANNABIS_LINKS_TAGLINE } from "@/lib/taglines";
import { SITE_LAST_UPDATED } from "@/lib/meta";

export const metadata = {
  title: "Cannabis and Cannabinoid Resource Links",
  description:
    "Curated outbound links to news outlets, research institutions, industry publications, and regulators covering cannabis, hemp, and cannabinoids.",
};

export default function CannabisLinksPage() {
  const total = cannabisLinks.reduce((n, s) => n + s.items.length, 0);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
        Cannabis and Cannabinoid Resource Links
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-4">
        A curated index of outbound resources.
      </h1>
      <p className="border-l-2 border-brand-text pl-4 italic text-brand-muted mb-3 max-w-prose">
        {CANNABIS_LINKS_TAGLINE}
      </p>
      <p className="text-sm text-brand-muted mb-12">
        {total} resources. Curated and verified {SITE_LAST_UPDATED}.
      </p>

      {cannabisLinks.map((section) => (
        <section key={section.heading} className="mb-12">
          <h2 className="font-serif text-2xl mb-5 border-b border-brand-border pb-2">
            {section.heading}
          </h2>
          <ul className="space-y-5">
            {section.items.map((item) => (
              <li key={item.url} className="max-w-prose">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-xs text-brand-muted/70 mt-1 break-all">{item.url}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
