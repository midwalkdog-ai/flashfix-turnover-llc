import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Trash2 } from "lucide-react";

export default function TrashOutsPage() {
  return (
    <ServicePageTemplate
      title="Property Trash Outs & Cleanouts"
      subtitle="Full Property Cleanouts"
      heroDescription="When tenants leave behind furniture, junk, or debris, FlashFix Turnover LLC clears it all out fast. We handle complete property cleanouts in Springfield, MO — from single rooms to entire houses — so you can start your turnover immediately."
      metaDescription="Property trash outs and cleanout services in Springfield, MO. Fast junk removal and full property cleanouts by FlashFix Turnover LLC."
      icon={Trash2}
      iconColor="text-red-600"
      iconBg="bg-red-50"
      priceRange="$299/property"
      turnaround="Same day – 1 day"
      features={[
        { title: "Full Property Cleanouts", description: "Complete removal of all furniture, appliances, and debris left by previous tenants." },
        { title: "Furniture Removal", description: "Sofas, beds, dressers, tables, and all large furniture hauled away and disposed of properly." },
        { title: "Appliance Disposal", description: "Old refrigerators, stoves, washers, and dryers removed and disposed of responsibly." },
        { title: "Debris Removal", description: "Construction debris, trash bags, boxes, and general clutter cleared from all areas." },
        { title: "Garage & Basement Cleanouts", description: "Garages, basements, attics, and storage areas fully cleared and swept out." },
        { title: "Yard Debris Removal", description: "Outdoor junk, yard waste, and debris removed from lawns, patios, and driveways." },
      ]}
      benefits={[
        "Same-day service available for urgent turnover situations",
        "We handle everything — you don't need to lift a finger",
        "Responsible disposal including donation of usable items when possible",
        "Eco-friendly recycling of metals, electronics, and materials",
        "Flat-rate pricing with no hidden fees based on volume",
        "Serving Springfield MO, Ozark, Nixa, Republic, and surrounding areas",
        "Fully insured crew for your protection and peace of mind",
      ]}
      processSteps={[
        "Request service online or call — describe the property and approximate volume",
        "We provide a flat-rate quote based on property size and estimated volume",
        "Our crew arrives with a truck and all necessary equipment",
        "All items removed from every room, garage, and outdoor areas",
        "Property swept clean and ready for the next phase of your turnover",
        "Responsible disposal, recycling, and donation of usable items",
      ]}
      faqs={[
        {
          question: "How do you price trash outs?",
          answer: "We price based on the volume of material and the size of the property. A standard apartment cleanout starts at $299. Full house cleanouts with heavy furniture and appliances are priced higher. We provide a flat-rate quote before starting.",
        },
        {
          question: "What items can you remove?",
          answer: "We remove almost everything: furniture, appliances, mattresses, boxes, trash bags, yard waste, construction debris, and general junk. We cannot remove hazardous materials like chemicals, paint, or asbestos.",
        },
        {
          question: "Do you donate or recycle items?",
          answer: "Yes. Usable furniture and household items are donated to local Springfield charities when possible. Metals and electronics are recycled responsibly. We aim to divert as much as possible from the landfill.",
        },
        {
          question: "Can you do a trash out and deep clean in the same visit?",
          answer: "Yes. We offer bundled trash out and deep cleaning services for a discounted rate. This is the most efficient way to turn over a property that was left in poor condition.",
        },
      ]}
      relatedServices={[
        { name: "Deep Cleaning", href: "/services/cleaning" },
        { name: "Painting", href: "/services/painting" },
        { name: "Drywall Repair", href: "/services/drywall" },
        { name: "Lock Changes", href: "/services/lock-changes" },
      ]}
    />
  );
}
