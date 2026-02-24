import { toText } from "@/lib/utils";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  settings: SiteSettings | null;
  baseUrl: string;
};

export function JsonLd({ settings, baseUrl }: Props) {
  if (!settings) return null;

  const payload = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: toText(settings.clinicName) || undefined,
    telephone: toText(settings.phone) || undefined,
    address: toText(settings.address)
      ? { "@type": "PostalAddress", streetAddress: toText(settings.address) }
      : undefined,
    openingHoursSpecification: toText(settings.businessHours)
      ? { "@type": "OpeningHoursSpecification", description: toText(settings.businessHours) }
      : undefined,
    url: baseUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
