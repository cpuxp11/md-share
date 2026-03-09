export function transformContent(raw: string, baseUrl?: string): string {
  let content = raw;

  // Remove frontmatter
  content = content.replace(/^---\n[\s\S]*?\n---\n/, "");

  // YouTube embeds: ![youtube](URL) or [![...](thumb)](youtube-url)
  content = content.replace(
    /!\[(?:youtube|video)\]\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)[^)]*)\)/gi,
    (_match, _url, id) =>
      `<div class="youtube-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border:3px solid var(--border);box-shadow:4px 4px 0 var(--shadow-color)"><iframe src="https://www.youtube.com/embed/${id}" style="position:absolute;top:0;left:0;width:100%;height:100%" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`
  );

  // Obsidian wikilinks: [[page]] or [[page|display]]
  content = content.replace(
    /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
    (_match, page, display) => `[${display || page}](#${slugify(page)})`
  );

  // Rewrite relative image paths if baseUrl provided
  if (baseUrl) {
    const base = baseUrl.replace(/\/[^/]*$/, "/");
    content = content.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/|data:)([^)]+)\)/g,
      (_, alt, path) => `![${alt}](${base}${path})`
    );
  }

  // Mermaid code blocks → special div for client rendering
  content = content.replace(
    /```mermaid\n([\s\S]*?)```/g,
    (_match, code) =>
      `<div class="mermaid-block" data-mermaid="${encodeURIComponent(code.trim())}"><pre><code class="language-mermaid">${escapeHtml(code.trim())}</code></pre></div>`
  );

  // Tags: #tag → badge
  content = content.replace(
    /(?<=\s|^)#([a-zA-Z\u3131-\u318E\uAC00-\uD7A3][\w\u3131-\u318E\uAC00-\uD7A3/-]*)/gm,
    '<span class="md-tag" style="display:inline-block;background:var(--accent);color:white;padding:0.1rem 0.5rem;font-size:0.8rem;font-weight:600;border:2px solid var(--border);margin:0.1rem">#$1</span>'
  );

  return content;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
