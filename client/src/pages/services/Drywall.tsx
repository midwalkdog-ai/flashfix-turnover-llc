import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Hammer } from "lucide-react";

export default function DrywallPage() {
  return (
    <ServicePageTemplate
      title="Drywall Repair & Installation"
      subtitle="Patch, Repair & Replace"
      heroDescription="From small nail holes to large damaged sections, FlashFix Turnover LLC handles all drywall repairs in Springfield, MO. We restore walls to like-new condition so your property is paint-ready and rent-ready fast."
      metaDescription="Professional drywall repair and installation in Springfield, MO. Patch holes, fix damage, and restore walls for rental turnovers. FlashFix Turnover LLC."
      icon={Hammer}
      iconColor="text-amber-600"
      iconBg="bg-amber-50"
      priceRange="$75/repair"
      turnaround="Same day – 2 days"
      features={[
        { title: "Nail & Screw Hole Patching", description: "Quick, seamless patching of small holes from nails, screws, and picture hooks." },
        { title: "Large Hole Repair", description: "Proper backing installation and multi-coat finishing for holes up to 12 inches." },
        { title: "Water Damage Repair", description: "Assessment and repair of water-damaged drywall including mold-resistant replacement." },
        { title: "Texture Matching", description: "Orange peel, knockdown, and smooth textures matched to existing walls." },
        { title: "Full Panel Replacement", description: "Complete drywall panel removal and replacement for severely damaged sections." },
        { title: "Corner Bead Repair", description: "Damaged corner beads replaced and finished for sharp, durable corners." },
      ]}
      benefits={[
        "Seamless repairs that blend invisibly with existing walls",
        "Texture matching for orange peel, knockdown, and smooth finishes",
        "Fast turnaround — most repairs completed same day",
        "Mold-resistant materials used in moisture-prone areas",
        "Paired with painting service for a complete wall restoration",
        "Experienced crew serving Springfield MO landlords and property managers",
        "All work guaranteed — we come back if it doesn't pass inspection",
      ]}
      processSteps={[
        "Request service online or call — describe the damage or send photos",
        "We assess the scope and provide a same-day quote",
        "Damaged drywall is cut out cleanly and backing installed as needed",
        "New drywall installed, taped, mudded, and sanded to a smooth finish",
        "Texture applied to match existing walls",
        "Ready for primer and paint — we can handle that too",
      ]}
      faqs={[
        {
          question: "Can you match my existing wall texture?",
          answer: "Yes. We match the most common textures found in Springfield rental properties including orange peel, knockdown, skip trowel, and smooth. We test on a small area first to ensure a perfect match.",
        },
        {
          question: "How long does drywall repair take to dry before painting?",
          answer: "Joint compound typically needs 24 hours to fully cure between coats. For small repairs, we can often prime and paint the same day. Larger repairs may require an overnight cure before painting.",
        },
        {
          question: "Do you handle water-damaged drywall?",
          answer: "Yes. We assess the source of moisture first, then remove and replace damaged drywall with mold-resistant materials. We recommend addressing the moisture source before repair.",
        },
        {
          question: "Can you repair drywall and paint in the same visit?",
          answer: "For small repairs, yes — we can patch, prime, and paint in one visit. For larger repairs requiring multiple mud coats, we typically return the next day to paint after the mud has fully dried.",
        },
      ]}
      relatedServices={[
        { name: "Painting", href: "/services/painting" },
        { name: "Deep Cleaning", href: "/services/cleaning" },
        { name: "Emergency Maintenance", href: "/services/emergency-maintenance" },
        { name: "Trash Outs", href: "/services/trash-outs" },
      ]}
    />
  );
}
