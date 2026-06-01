import Link from "next/link";
import { SITE_LAST_UPDATED } from "@/lib/meta";

const sections = [
  {
    href: "/cannabis",
    title: "Cannabis and Cannabinoid Current Events",
    description:
      "Reporting on policy, science, industry, and market developments across cannabis, hemp, and cannabinoids.",
  },
  {
    href: "/cannabis-links",
    title: "Cannabis Resource Links",
    description:
      "Curated outbound links to news outlets, research institutions, industry publications, and regulators.",
  },
  {
    href: "/wellness",
    title: "Health and Wellness Articles",
    description:
      "Editorial coverage of sleep, stress, recovery, mindfulness, and nutrition for general readers.",
  },
  {
    href: "/wellness-links",
    title: "Wellness Resource Links",
    description:
      "Curated outbound links to government health agencies, academic medical centers, and specialty publications.",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <section className="mb-12">
        <p className="text-xs uppercase tracking-widest text-brand-muted mb-3">
          An Information Resource from 1906
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-5">
          Reporting on cannabis, cannabinoids, and the science of health and wellness.
        </h1>
        <p className="text-lg text-brand-muted max-w-prose leading-relaxed">
          1906 publishes editorial coverage and curated reference links on current events in
          cannabis, hemp, and cannabidiol, and on the broader landscape of health and wellness.
          The resource is intended for general readers, journalists, researchers, and clinicians
          seeking accessible, up-to-date information.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-5 mb-14">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block border border-brand-border rounded-md p-5 hover:border-brand-text transition-colors hover:no-underline"
          >
            <h2 className="font-serif text-2xl mb-2">{s.title}</h2>
            <p className="text-sm text-brand-muted leading-relaxed">{s.description}</p>
            <p className="text-xs uppercase tracking-widest text-brand-text mt-4">
              Read section
            </p>
          </Link>
        ))}
      </section>

      <section className="border-t border-brand-border pt-8">
        <h2 className="font-serif text-2xl mb-4">About 1906</h2>
        <div className="text-brand-muted leading-relaxed space-y-4 max-w-prose">
          <p>
            1906 is a wellness company committed to education around cannabis and health. This
            resource exists to provide accurate, current information on the cannabinoid
            landscape and on broader wellness topics, drawing on peer-reviewed research,
            regulatory updates, and reporting from established outlets.
          </p>
          <p>
            We believe cannabis is among the most studied plants in modern medicine, and we
            believe that high-quality information about cannabinoids and about everyday wellness
            should be accessible to anyone. This site aggregates editorial articles and
            outbound links to support that goal.
          </p>
          <p>
            For editorial inquiries, contact{" "}
            <a href="mailto:info@1906wellness.com" className="underline">
              info@1906wellness.com
            </a>
            . Last updated {SITE_LAST_UPDATED}.
          </p>
        </div>
      </section>
    </div>
  );
}
