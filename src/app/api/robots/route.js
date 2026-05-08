export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://nsid.bd/api/sitemap
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
