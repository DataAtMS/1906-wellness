import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cannabis", label: "Cannabis Articles" },
  { href: "/cannabis-links", label: "Cannabis Links" },
  { href: "/wellness", label: "Wellness Articles" },
  { href: "/wellness-links", label: "Wellness Links" },
];

export default function Header() {
  return (
    <header className="border-b border-brand-border bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 hover:no-underline">
          <Image
            src="/1906-logo.png"
            alt="1906"
            width={120}
            height={48}
            priority
            className="h-10 sm:h-12 w-auto"
            style={{ height: "auto" }}
          />
          <span className="sr-only">1906</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
