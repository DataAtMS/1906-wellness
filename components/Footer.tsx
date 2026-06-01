import { SITE_LAST_UPDATED } from "@/lib/meta";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-brand-muted flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-brand-text">An information resource from 1906.</p>
          <p>
            Contact:{" "}
            <a href="mailto:info@1906wellness.com" className="underline">
              info@1906wellness.com
            </a>
          </p>
        </div>
        <div className="text-right">
          <p>© 2026 1906. All rights reserved.</p>
          <p>Last updated: {SITE_LAST_UPDATED}</p>
        </div>
      </div>
    </footer>
  );
}
