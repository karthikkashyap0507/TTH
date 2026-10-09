import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/home/Services";
import { WorkPreview } from "@/components/home/WorkPreview";
import { ResultsTeaser } from "@/components/home/ResultsTeaser";
import { Clients } from "@/components/Clients";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/home/Process";
import { TeamTeaser } from "@/components/home/TeamTeaser";
import { ContactCTA } from "@/components/ContactCTA";
import { services, site, tagline } from "@/content/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    alternateName: site.shortName,
    slogan: tagline,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone.replace(/\s/g, ""),
    areaServed: "IN",
    address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
    sameAs: [site.socials.instagram.href, site.socials.linkedin.href],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.line },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <Marquee />
      <Services />
      <ResultsTeaser />
      <Clients />
      <WorkPreview />
      <Testimonials />
      <Stats />
      <Process />
      <TeamTeaser />
      <ContactCTA />
    </>
  );
}
