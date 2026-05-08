import { PROJECTS } from "../../../data/projects";

const BASE = "https://nsid.bd";

export async function GET() {
  const staticRoutes = ["", "/portfolio", "/studio", "/journal", "/contact"];
  const projectRoutes = PROJECTS.map((p) => `/portfolio/${p.slug}`);
  const all = [...staticRoutes, ...projectRoutes];

  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (r) => `  <url>
    <loc>${BASE}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r === "" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
