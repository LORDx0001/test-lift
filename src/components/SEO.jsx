import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function SEO({ title, description, image, type = "website", keywords }) {
  const { pathname } = useLocation();
  const siteUrl = "https://safetechengineering.uz"; // Replace with actual domain when known
  const url = `${siteUrl}${pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
      
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
