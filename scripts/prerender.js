// After `react-scripts build`: write one HTML file per category / bulk page with its own
// <title>, description, canonical and social tags, and regenerate sitemap.xml.
const fs = require("fs");
const path = require("path");
const PAGES = require("../src/pages.json");

const BUILD = path.join(__dirname, "..", "build");

// Server-render the React app for each URL so crawlers that don't run JavaScript see the real content.
const esbuild = require("esbuild");
const React = require("react");
const { renderToString } = require("react-dom/server");
const SSR_OUT = path.join(BUILD, ".ssr", "app.cjs");
esbuild.buildSync({
  entryPoints: [path.join(__dirname, "..", "src", "App.jsx")],
  bundle: true, platform: "node", format: "cjs", outfile: SSR_OUT,
  external: ["react", "react-dom"], jsx: "automatic", loader: { ".js": "jsx" }, logLevel: "warning",
});
function ssr(urlPath) {
  globalThis.__FW_PATH__ = urlPath;
  delete require.cache[require.resolve(SSR_OUT)];
  const App = require(SSR_OUT).default;
  const html = renderToString(React.createElement(App));
  delete globalThis.__FW_PATH__;
  return html;
}
const inject = (html, urlPath) => {
  if (!html.includes('<div id="root"></div>')) throw new Error("prerender: root div not found");
  return html.replace('<div id="root"></div>', `<div id="root">${ssr(urlPath)}</div>`);
};

const base = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function render(page, noscript, crumbLabel) {
  const url = `${PAGES.site}/${page.slug}`;
  const t = esc(page.title);
  const d = esc(page.description);
  const swaps = [
    [/<title>[^<]*<\/title>/, `<title>${t}</title>`],
    [/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`],
    [/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`],
    [/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${noscript}</noscript>`],
  ];
  if (page.ogImage) {
    swaps.push([/(<meta property="og:image" content=")[^"]*(")/, `$1${page.ogImage}$2`]);
    swaps.push([/(<meta name="twitter:image" content=")[^"]*(")/, `$1${page.ogImage}$2`]);
  }
  const crumbs = [{ name: "Home", item: `${PAGES.site}/` }];
  if (crumbLabel !== "Bulk Orders") crumbs.push({ name: "Products", item: `${PAGES.site}/#products` });
  crumbs.push({ name: crumbLabel, item: url });
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };
  swaps.push([/<\/head>/, `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script></head>`]);
  let html = base;
  for (const [re, val] of swaps) {
    if (!re.test(html)) throw new Error(`prerender: pattern not found ${re}`);
    html = html.replace(re, val);
  }
  fs.writeFileSync(path.join(BUILD, `${page.slug}.html`), inject(html, `/${page.slug}`));
}

const contact = "<p>Order on WhatsApp: +91 81056 77799 · Instagram: @ferrouswheel27 · Email: ferrouswheel27@gmail.com</p>";
const links = PAGES.categories.map((c) => `<a href="/${c.slug}">${esc(c.h1)}</a>`).join(" · ");

for (const c of PAGES.categories) {
  render(c, `<h1>${esc(c.h1)} — Ferrouswheel, Bangalore</h1>${c.intro.map((p) => `<p>${esc(p)}</p>`).join("")}${contact}<p>${links}</p>`, c.h1);
}
render(PAGES.bulk, `<h1>${esc(PAGES.bulk.h1)} — Ferrouswheel</h1><p>${esc(PAGES.bulk.description)}</p>${contact}<p>${links}</p>`, "Bulk Orders");

fs.writeFileSync(path.join(BUILD, "index.html"), inject(base, "/"));
fs.rmSync(path.join(BUILD, ".ssr"), { recursive: true, force: true });

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${PAGES.site}/`, priority: "1.0" },
  { loc: `${PAGES.site}/${PAGES.bulk.slug}`, priority: "0.9" },
  ...PAGES.categories.map((c) => ({ loc: `${PAGES.site}/${c.slug}`, priority: "0.8" })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap);
console.log(`prerender: wrote ${PAGES.categories.length + 1} pages + sitemap.xml (${urls.length} URLs)`);
