// ---------------------------------------------------------------------------
// Single source of truth for all per-route SEO.
//
// This module owns: <title>, meta description/keywords, canonical URL,
// Open Graph + Twitter Card image/alt, and the per-route JSON-LD @graph
// (Organization, WebSite, ProfessionalService/LocalBusiness with real NAP,
// Service nodes, BreadcrumbList).
//
// It is consumed today by the runtime injector in src/App.tsx, and is designed
// to also feed a future build-time prerender step so non-JS crawlers and social
// unfurlers receive correct per-route HTML. Keep ALL metadata here — never
// hardcode it in components again.
// ---------------------------------------------------------------------------
import type { PathRoute } from "./router";
import {
  SITE_URL,
  COMPANY_NAME,
  CONSULTATION_PHONE,
  CONTACT_EMAIL,
  HQ_ADDRESS,
  OFFICE_LOCATIONS,
} from "./config";
import { servicesData } from "./data";

export interface RouteSeo {
  title: string;
  description: string;
  keywords: string;
  /** Absolute OG/Twitter share image. */
  ogImage: string;
  ogImageAlt: string;
  /** Label for this route in a BreadcrumbList (subpages only). */
  breadcrumb: string;
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-og.png`;
const DEFAULT_OG_ALT =
  "4X BackOffice — B2B Forex back office solutions for global brokers";
const ORG_DESCRIPTION =
  "Enterprise-grade B2B forex back office solutions: MT5 administration, low-latency server management, risk protection, and high-performance liquidity bridge integrations.";

/** Fallback used for unknown routes (mirrors the homepage). */
export const DEFAULT_SEO: RouteSeo = {
  title: "Forex Back Office Solutions for Brokers | 4X BackOffice",
  description:
    "Enterprise B2B forex back office solutions: MT5 administration, low-latency server management, and PrimeXM/Centroid liquidity bridges for global brokers.",
  keywords:
    "Forex back office solutions, MT5 administration, server management, liquidity bridge, risk management, broker technology provider",
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: DEFAULT_OG_ALT,
  breadcrumb: "Home",
};

export const ROUTE_SEO: Record<PathRoute, RouteSeo> = {
  "/": {
    title: "Forex Back Office Solutions for Brokers | 4X BackOffice",
    description:
      "Enterprise B2B forex back office solutions: MT5 administration, low-latency server management, and PrimeXM/Centroid liquidity bridges for global brokers.",
    keywords:
      "Forex Back Office Solutions, Forex Broker Solutions, MT5 Administration, Forex Infrastructure, Broker Technology Provider, Forex CRM Solutions",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: DEFAULT_OG_ALT,
    breadcrumb: "Home",
  },
  "/why-us": {
    title: "Why Choose 4X BackOffice | Broker Infrastructure",
    description:
      "See why global brokers trust 4X BackOffice for institutional MT5 servers, 99.99% uptime, core risk protection, and multi-tier liquidity bridge management.",
    keywords:
      "Why Choose 4X BackOffice, Broker Infrastructure, Forex Infrastructure, MT5 Server Uptime, Broker Technology Partner",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Why brokers choose 4X BackOffice broker infrastructure",
    breadcrumb: "Why Us",
  },
  "/services": {
    title: "Forex Broker Services & MT5 Administration | 4X BackOffice",
    description:
      "Forex broker technology services: custom MT5 configuration, server hosting, liquidity bridges, risk management, data protection, and 24/7 support.",
    keywords:
      "Forex Broker Services, MT5 Administration, Forex Risk Management, Liquidity Bridge Solutions, Broker CRM Integration, Server Management",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "4X BackOffice forex broker services and MT5 administration",
    breadcrumb: "Services",
  },
  "/products": {
    title: "Forex Broker Products: Copy Trading & B-Book | 4X BackOffice",
    description:
      "Advanced broker products — copy trading, swap management, credit control, and B-book slippage protection — engineered to scale your brokerage. Talk to us.",
    keywords:
      "Forex Broker Products, Copy Trading Solutions, Swap Management, Credit Management, B-Book Slippage Management",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "4X BackOffice forex broker products: copy trading, swaps, B-book",
    breadcrumb: "Products",
  },
  "/contact": {
    title: "Contact 4X BackOffice | Forex Technology Consultation",
    description:
      "Contact 4X BackOffice to configure your brokerage infrastructure, deploy MT5 servers, or set up liquidity bridges. Serving Dubai, Hong Kong, Singapore & London.",
    keywords:
      "Contact Forex Technology Provider, Forex Technology Partner, MT5 Admin Support, Custom Bridge Setup Contact",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Contact 4X BackOffice forex technology consultants",
    breadcrumb: "Contact",
  },
};

/** Ordered list of indexable routes (also drives the sitemap). */
export const ROUTES = Object.keys(ROUTE_SEO) as PathRoute[];

export function isKnownRoute(path: string): path is PathRoute {
  return path in ROUTE_SEO;
}

/** Metadata for a path, falling back to DEFAULT_SEO for unknown routes. */
export function getRouteSeo(path: string): RouteSeo {
  return ROUTE_SEO[path as PathRoute] ?? DEFAULT_SEO;
}

/** Absolute canonical URL for a path (apex host, no trailing slash except root). */
export function canonicalFor(path: string): string {
  if (!isKnownRoute(path) || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

// --------------------------- JSON-LD graph nodes ---------------------------

function postalAddress() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: HQ_ADDRESS.locality,
    addressRegion: HQ_ADDRESS.region,
    addressCountry: HQ_ADDRESS.country,
  };
  // Only emit street/postal once they are filled in config — never ship blanks.
  if (HQ_ADDRESS.street) address.streetAddress = HQ_ADDRESS.street;
  if (HQ_ADDRESS.postalCode) address.postalCode = HQ_ADDRESS.postalCode;
  return address;
}

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo-og.png`,
  description: ORG_DESCRIPTION,
  // Populate with real Google Business Profile / LinkedIn URLs when available.
  sameAs: [] as string[],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONSULTATION_PHONE,
      email: CONTACT_EMAIL,
      contactType: "sales",
      areaServed: OFFICE_LOCATIONS,
      availableLanguage: ["English"],
    },
  ],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: COMPANY_NAME,
  description: "B2B Forex Back Office Solutions, MT5 Administration & Support",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const LOCAL_BUSINESS = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: COMPANY_NAME,
  url: SITE_URL,
  telephone: CONSULTATION_PHONE,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/logo-og.png`,
  logo: `${SITE_URL}/logo.png`,
  priceRange: "$$$",
  address: postalAddress(),
  areaServed: OFFICE_LOCATIONS.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

function serviceNodes() {
  return servicesData.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/services#${service.id}`,
    name: service.title,
    serviceType: service.title,
    description: service.fullDesc,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Global",
  }));
}

function breadcrumbList(path: PathRoute, label: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

/**
 * Build the per-route JSON-LD @graph.
 * Sitewide: Organization + WebSite + ProfessionalService (NAP).
 * /services: + Service nodes. Subpages: + BreadcrumbList.
 * NOTE: FAQPage is emitted separately by SEOSections.tsx so its markup stays
 * byte-identical to the visible FAQ — only render it where the FAQ is shown.
 */
export function buildGraph(path: string) {
  const graph: Record<string, unknown>[] = [ORGANIZATION, WEBSITE, LOCAL_BUSINESS];

  if (path === "/services") graph.push(...serviceNodes());

  if (isKnownRoute(path) && path !== "/") {
    graph.push(breadcrumbList(path, getRouteSeo(path).breadcrumb));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// --------------------------- Server-side head rendering ---------------------------
// Used by server.ts to inject correct per-route <head> tags at request time
// (so non-JS crawlers and social unfurlers get real per-page metadata), and
// reusable by a future build-time prerender step. Pure string output — no DOM.

function escAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const OG_IMAGE_W = "1200";
const OG_IMAGE_H = "630";

/**
 * Render the full set of SEO-managed <head> tags for a route as an HTML string:
 * title, description/keywords, canonical, Open Graph, Twitter Card, and JSON-LD.
 * This is the exact block wrapped by the seo:head markers in index.html.
 */
export function renderHeadTags(path: string, opts: { noindex?: boolean } = {}): string {
  const seo = getRouteSeo(path);
  const canonical = canonicalFor(path);
  const title = opts.noindex ? `Page Not Found | ${COMPANY_NAME}` : seo.title;
  // Escape "<" inside JSON-LD so the string can't break out of the <script>.
  const jsonLd = JSON.stringify(buildGraph(path)).replace(/</g, "\\u003c");

  const tags = [
    opts.noindex ? `<meta name="robots" content="noindex,follow" />` : "",
    `<title>${escAttr(title)}</title>`,
    `<meta name="description" content="${escAttr(seo.description)}" />`,
    `<meta name="keywords" content="${escAttr(seo.keywords)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escAttr(COMPANY_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${escAttr(canonical)}" />`,
    `<meta property="og:title" content="${escAttr(title)}" />`,
    `<meta property="og:description" content="${escAttr(seo.description)}" />`,
    `<meta property="og:image" content="${escAttr(seo.ogImage)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_W}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_H}" />`,
    `<meta property="og:image:alt" content="${escAttr(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${escAttr(canonical)}" />`,
    `<meta name="twitter:title" content="${escAttr(title)}" />`,
    `<meta name="twitter:description" content="${escAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escAttr(seo.ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escAttr(seo.ogImageAlt)}" />`,
    `<link rel="canonical" href="${escAttr(canonical)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].filter(Boolean);

  return tags.join("\n    ");
}
