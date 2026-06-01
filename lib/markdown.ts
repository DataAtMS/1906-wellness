// Minimal, dependency-free markdown to HTML for body paragraphs.
// Articles are plain prose with paragraph breaks and optional ## / ### headings.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string): string {
  // Bold **text** and italic *text*.
  let out = escapeHtml(s);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let buf: string[] = [];

  const flushParagraph = () => {
    if (buf.length) {
      const text = buf.join(" ").trim();
      if (text) blocks.push(`<p>${inline(text)}</p>`);
      buf = [];
    }
  };

  for (const line of lines) {
    if (line.trim() === "") {
      flushParagraph();
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    if (h2) {
      flushParagraph();
      blocks.push(`<h2>${inline(h2[1])}</h2>`);
      continue;
    }
    if (h3) {
      flushParagraph();
      blocks.push(`<h3>${inline(h3[1])}</h3>`);
      continue;
    }
    buf.push(line.trim());
  }
  flushParagraph();
  return blocks.join("\n");
}
