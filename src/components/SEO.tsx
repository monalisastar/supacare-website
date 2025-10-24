"use client";

import Head from "next/head";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceItem {
  name: string;
  description: string;
  price?: string;
  currency?: string;
  availability?: string;
}

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
  schema?: object;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  faqs?: FAQItem[];
  services?: ServiceItem[]; // ✅ for Product/Service schema
}

/**
 * ✅ Supacare SEO Component (Complete)
 * - WebPage + Breadcrumb + Article + FAQ + Service Schemas
 * - Global brand + social metadata
 */
export default function SEO({
  title,
  description,
  url,
  image = "https://www.supacaresolutions.com/images/supalogo.png",
  keywords = [],
  schema,
  author = "Supacare Editorial Team",
  publishedTime,
  modifiedTime,
  faqs = [],
  services = [],
}: SEOProps) {
  const keywordString = keywords.join(", ");

  // --- Auto breadcrumb generator ---
  const pathSegments = url
    .replace("https://www.supacaresolutions.com", "")
    .split("/")
    .filter(Boolean);

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.supacaresolutions.com",
    },
    ...pathSegments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      item: `https://www.supacaresolutions.com/${pathSegments
        .slice(0, index + 1)
        .join("/")}`,
    })),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // --- Base WebPage schema ---
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "Supacare Solutions",
      url: "https://www.supacaresolutions.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.supacaresolutions.com/images/supalogo.png",
      },
    },
  };

  // --- Auto Article schema ---
  const isArticle =
    url.includes("/blog") || url.includes("/news") || url.includes("/post");

  const articleSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@type": "Organization",
          name: "Supacare Solutions",
          logo: {
            "@type": "ImageObject",
            url: "https://www.supacaresolutions.com/images/supalogo.png",
          },
        },
        datePublished: publishedTime || new Date().toISOString(),
        dateModified: modifiedTime || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        image: image,
      }
    : null;

  // --- FAQ Schema ---
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  // --- Product/Service Schema ---
  const isServicePage =
    url.includes("/services") || url.includes("/products");

  const serviceSchema =
    isServicePage && services.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Environmental & Sustainability Services",
          provider: {
            "@type": "Organization",
            name: "Supacare Solutions",
            url: "https://www.supacaresolutions.com",
            logo: "https://www.supacaresolutions.com/images/supalogo.png",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Supacare Services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.name,
                description: s.description,
              },
              price: s.price || undefined,
              priceCurrency: s.currency || "KES",
              availability: s.availability || "https://schema.org/InStock",
              url,
            })),
          },
        }
      : null;

  const mergedSchema = schema || defaultSchema;

  // Combine all schemas
  const allSchemas = [mergedSchema, breadcrumbSchema];
  if (articleSchema) allSchemas.push(articleSchema);
  if (faqSchema) allSchemas.push(faqSchema);
  if (serviceSchema) allSchemas.push(serviceSchema);

  return (
    <Head>
      {/* ✅ Core Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywordString} />}
      <link rel="canonical" href={url} />

      {/* ✅ Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:image" content={image} />

      {/* ✅ Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ Structured Data (WebPage + Breadcrumb + optional Article + FAQ + Service) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
      />
    </Head>
  );
}
