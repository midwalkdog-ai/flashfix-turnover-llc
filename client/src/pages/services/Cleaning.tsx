import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Sparkles } from "lucide-react";

export default function CleaningPage() {
  return (
    <ServicePageTemplate
      title="Move-Out Deep Cleaning"
      subtitle="Rental Property Cleaning"
      heroDescription="FlashFix Turnover LLC provides thorough move-out deep cleaning services for rental properties in Springfield, MO. Our cleaning crews tackle every surface so your property passes inspection and impresses new tenants from day one."
      metaDescription="Move-out deep cleaning services in Springfield, MO for rental properties. Professional property cleaning by FlashFix Turnover LLC — passes every inspection."
      icon={Sparkles}
      iconColor="text-green-600"
      iconBg="bg-green-50"
      priceRange="$199/unit"
      turnaround="Same day – 1 day"
      features={[
        { title: "Kitchen Deep Clean", description: "Appliances inside and out, cabinets, countertops, sink, and backsplash scrubbed clean." },
        { title: "Bathroom Sanitization", description: "Toilets, showers, tubs, sinks, mirrors, and tile grout cleaned and disinfected." },
        { title: "Floor Cleaning", description: "Vacuuming, mopping, and spot treatment for all hard floors and carpeted areas." },
        { title: "Window Cleaning", description: "Interior window glass, sills, and tracks cleaned for a streak-free finish." },
        { title: "Wall & Baseboard Wipe-Down", description: "Scuff marks, fingerprints, and grime removed from walls and baseboards." },
        { title: "Appliance Cleaning", description: "Oven, refrigerator, dishwasher, and microwave cleaned inside and out." },
      ]}
      benefits={[
        "Inspection-ready results — we clean to property management standards",
        "Eco-friendly, tenant-safe cleaning products used throughout",
        "Flexible scheduling including weekends and same-day availability",
        "Photo documentation provided before and after every clean",
        "Consistent results across multiple units and properties",
        "Trusted by Springfield MO property managers for reliable turnovers",
        "Add-on carpet steam cleaning available for an additional fee",
      ]}
      processSteps={[
        "Book online or call — provide unit size and condition details",
        "We schedule your cleaning at a time that works for your turnover timeline",
        "Our crew arrives with all supplies and equipment",
        "Systematic room-by-room deep cleaning from top to bottom",
        "Final walkthrough to ensure every surface meets our standard",
        "Before and after photos sent to you for your records",
      ]}
      faqs={[
        {
          question: "What's included in a standard move-out clean?",
          answer: "Our standard clean covers all rooms: kitchen (appliances, cabinets, counters), bathrooms (toilet, shower, sink, mirror), all floors, windows, walls, and baseboards. We bring all supplies and equipment.",
        },
        {
          question: "How long does a move-out clean take?",
          answer: "A standard 2-bedroom apartment typically takes 3–5 hours depending on condition. Heavily soiled units or larger homes may take longer. We'll give you a time estimate when you book.",
        },
        {
          question: "Do you offer carpet cleaning?",
          answer: "Yes, we offer carpet steam cleaning as an add-on service. This is highly recommended for move-out turnovers and can often help recover security deposits for landlords.",
        },
        {
          question: "Can you clean multiple units at the same time?",
          answer: "Yes. We can deploy multiple crews to handle several units simultaneously, which is ideal for large apartment complexes with multiple turnovers at once. Contact us for volume pricing.",
        },
      ]}
      relatedServices={[
        { name: "Painting", href: "/services/painting" },
        { name: "Drywall Repair", href: "/services/drywall" },
        { name: "Trash Outs", href: "/services/trash-outs" },
        { name: "Lock Changes", href: "/services/lock-changes" },
      ]}
    />
  );
}
