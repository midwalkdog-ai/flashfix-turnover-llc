import ServicePageTemplate from "@/components/ServicePageTemplate";
import { PaintBucket } from "lucide-react";

export default function PaintingPage() {
  return (
    <ServicePageTemplate
      title="Professional Painting Services"
      subtitle="Interior & Exterior Painting"
      heroDescription="FlashFix Turnover LLC delivers fast, professional painting services for rental properties, apartment units, and investment properties throughout Springfield, MO. We use premium paints and proven techniques to get your property rent-ready fast."
      metaDescription="Professional painting services in Springfield, MO for rental properties and turnovers. Interior and exterior painting by FlashFix Turnover LLC."
      icon={PaintBucket}
      iconColor="text-blue-600"
      iconBg="bg-blue-50"
      priceRange="$150/room"
      turnaround="1–3 days"
      features={[
        { title: "Interior Wall Painting", description: "Full wall prep, priming, and two-coat application for a smooth, durable finish." },
        { title: "Ceiling Painting", description: "Flat white ceiling paint applied cleanly without overspray on walls or trim." },
        { title: "Trim & Baseboard Painting", description: "Crisp, clean trim painting that makes any room look freshly renovated." },
        { title: "Door & Cabinet Painting", description: "Doors, closets, and cabinet fronts painted for a consistent, updated look." },
        { title: "Exterior Painting", description: "Weather-resistant exterior paint for siding, trim, shutters, and porches." },
        { title: "Color Matching", description: "We match existing paint colors or help you choose neutral, tenant-friendly tones." },
      ]}
      benefits={[
        "Premium Sherwin-Williams and Benjamin Moore paints used on every job",
        "Thorough surface prep including patching, sanding, and priming",
        "Neutral, market-tested color palettes that attract quality tenants",
        "Minimal disruption — most units painted in 1 to 2 days",
        "Clean job sites — we protect floors, fixtures, and furniture",
        "Free color consultations for landlords and property managers",
        "Springfield MO's most trusted painting crew for rental turnovers",
      ]}
      processSteps={[
        "Submit your request online with property address and unit count",
        "We inspect the property and provide a detailed, itemized quote within 2 hours",
        "Our painters arrive on schedule with all materials and equipment",
        "Surface prep: patching nail holes, sanding, taping, and priming as needed",
        "Two-coat application with quality paint for lasting results",
        "Final walkthrough and touch-ups before sign-off",
      ]}
      faqs={[
        {
          question: "How long does it take to paint a standard rental unit?",
          answer: "A typical 2-bedroom apartment takes 1–2 days for full interior painting including prep, priming, and two coats. Larger homes or units requiring extensive repairs may take 3 days.",
        },
        {
          question: "What paint brands do you use?",
          answer: "We primarily use Sherwin-Williams and Benjamin Moore paints. We recommend their rental-grade flat or eggshell finishes for walls and semi-gloss for trim and bathrooms.",
        },
        {
          question: "Do you paint the ceilings and trim too?",
          answer: "Yes. Our standard painting service includes walls, ceilings, trim, and doors unless otherwise specified. We can also do partial painting if only certain areas need refreshing.",
        },
        {
          question: "Can you match the existing paint color?",
          answer: "Absolutely. Bring us a paint chip or we can color-match from the existing walls using our spectrophotometer. We can also recommend neutral colors popular in the Springfield rental market.",
        },
      ]}
      relatedServices={[
        { name: "Drywall Repair", href: "/services/drywall" },
        { name: "Deep Cleaning", href: "/services/cleaning" },
        { name: "Lock Changes", href: "/services/lock-changes" },
        { name: "Trash Outs", href: "/services/trash-outs" },
      ]}
    />
  );
}
