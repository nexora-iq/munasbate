import type { Metadata } from "next";
import "./globals.css";

import welcomeDesktop from "../assets/welcome-bg.jpg";
import welcomeTablet from "../assets/welcome-bg-tablet.jpg";
import welcomeMobile from "../assets/welcome-bg-mobile.jpg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://munasbate.netlify.app";

const previewImages = [
  {
    url: welcomeDesktop.src,
    width: welcomeDesktop.width,
    height: welcomeDesktop.height,
    alt: "مناسباتي - قاعات المناسبات والأعراس في العراق",
  },
  {
    url: welcomeTablet.src,
    width: welcomeTablet.width,
    height: welcomeTablet.height,
    alt: "مناسباتي - صورة المعاينة للأجهزة اللوحية",
  },
  {
    url: welcomeMobile.src,
    width: welcomeMobile.width,
    height: welcomeMobile.height,
    alt: "مناسباتي - صورة المعاينة للهواتف",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "مناسباتي | Munasbate - دليلك الأول لحجز قاعات الأعراس والمناسبات",
  description:
    "دليلك لحجز قاعات المناسبات والأعراس في العراق. تصفح القاعات، قارن الأسعار والخدمات، وشاهد الصور والفيديوهات قبل الحجز.",
  keywords: [
    "قاعات",
    "أعراس",
    "قاعات أعراس",
    "حجز قاعات",
    "تطبيق مناسباتي",
    "مناسبات",
    "قاعات بغداد",
    "قاعات العراق",
    "Munasbate",
    "زواجات",
    "حجز قاعة",
    "أسعار القاعات",
    "دليل القاعات",
  ],
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32" },
      { url: "/logo.png", sizes: "192x192" },
      { url: "/logo.png", sizes: "512x512" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "مناسباتي | Munasbate - دليلك لحجز قاعات الأعراس",
    description:
      "تصفح قاعات المناسبات والأعراس في العراق، قارن الأسعار والخدمات وشاهد الصور قبل الحجز.",
    siteName: "مناسباتي",
    images: previewImages,
    locale: "ar_IQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مناسباتي | Munasbate",
    description: "دليلك لحجز قاعات المناسبات والأعراس في العراق.",
    images: previewImages.map((image) => image.url),
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "مناسباتي",
      "operatingSystem": "ANDROID, IOS",
      "applicationCategory": "LifestyleApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IQD",
      },
      "description": "دليلك الأول لحجز قاعات المناسبات والأعراس في العراق.",
    },
    {
      "@type": "Organization",
      "name": "تطبيق مناسباتي",
      "logo": new URL("/logo.png", siteUrl).toString(),
      "url": siteUrl,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "areaServed": "IQ",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
