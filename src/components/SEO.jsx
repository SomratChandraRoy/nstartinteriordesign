import { useEffect } from "react";

/**
 * Manages document head metadata + JSON-LD schema.
 * Replicates Next.js Metadata API for the Vite/React platform.
 */
function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  keywords = [],
  canonical,
  image,
  schema,
}) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("description", description);
    if (keywords?.length) setMeta("keywords", keywords.join(", "));
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    if (image) setMeta("og:image", image, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);
    setMeta("robots", "index, follow");
    setMeta("author", "NorthStar Interior Design (NSID)");
    setMeta("theme-color", "#030712");
    setMeta("viewport", "width=device-width, initial-scale=1, maximum-scale=5");
    setMeta("format-detection", "telephone=no");
    if (canonical) setLink("canonical", canonical);

    // JSON-LD
    const id = "jsonld-page";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [title, description, keywords, canonical, image, schema]);

  return null;
}

// Pre-built schema generators
export const schemas = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    name: "নর্থস্টার ইন্টেরিয়র ডিজাইন (NSID)",
    url: "https://nsid.bd",
    logo: "https://nsid.bd/n.png",
    description:
      "নর্থস্টার ইন্টেরিয়র ডিজাইন (NSID) is a premier interior design studio based in Dhaka, Bangladesh, specializing in luxury residential and corporate interiors across all major divisions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House #87, Road #15, Sector #11",
      addressLocality: "Uttara",
      addressRegion: "Dhaka",
      postalCode: "1230",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.8759,
      longitude: 90.3795,
    },
    telephone: "+880-1816-072106",
    email: "nstar.interior@gmail.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      "Rangpur",
      "Rajshahi",
      "Chittagong",
      "Khulna",
      "Dhaka",
      "Gazipur",
      "Sylhet",
      "Comilla",
      "Narayanganj",
      "Barisal",
      "Uttara",
      "Bangladesh",
    ],
    priceRange: "$$$$",
    sameAs: [
      "https://www.facebook.com/NSID.BD/",
    ],
  }),

  project: ({ name, description, image, location, year }) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    image,
    creator: {
      "@type": "Organization",
      name: "NorthStar Interior Design (NSID)",
    },
    locationCreated: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressLocality: location,
        addressRegion: "Dhaka",
        addressCountry: "BD",
      },
    },
    dateCreated: year,
  }),

  breadcrumb: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }),
};
