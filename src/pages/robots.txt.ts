import type { APIRoute } from 'astro';
export const prerender = true;
export const GET: APIRoute = ({ site }) => { return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap-index.xml', site ?? 'https://ayoubkhan.vercel.app').href}\n`, { headers: { 'Content-Type': 'text/plain' } }); }
