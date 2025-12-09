import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface GeoHelmetProps {
  title: string;
  description: string;
  schema?: object;
  image?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  faq?: Array<{ question: string; answer: string }>;
}

const GeoHelmet: React.FC<GeoHelmetProps> = ({
  title,
  description,
  schema,
  image = "https://www.starmebooks.com/og-image.jpg",
  type = "website",
  keywords,
  author = "StarMe",
  publishedTime,
  modifiedTime,
  faq
}) => {
  const location = useLocation();
  const baseUrl = "https://www.starmebooks.com";
  
  const cleanPath = location.pathname.replace(/\/+$/, '');
  const canonicalUrl = `${baseUrl}${cleanPath || ''}`;
  
  const absoluteImage = image.startsWith('http') 
    ? image 
    : `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`;
  
  // FAQ Schema for AI
  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <Helmet defer={false}>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:site_name" content="StarMe Personalized Books" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* GEO - AI Search Engine Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* Additional GEO Tags */}
      <meta name="abstract" content={description} />
      <meta name="topic" content="personalized children's books" />
      <meta name="summary" content={description} />
      <meta name="classification" content="E-commerce" />
      <meta name="category" content="Children's Products" />
      <meta name="coverage" content="India" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />

      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default GeoHelmet;