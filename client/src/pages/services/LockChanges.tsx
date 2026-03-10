import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Lock } from "lucide-react";

export default function LockChangesPage() {
  return (
    <ServicePageTemplate
      title="Lock Changes & Rekeying"
      subtitle="Security Between Tenants"
      heroDescription="Protect your property and your new tenants with professional lock changes and rekeying services in Springfield, MO. FlashFix Turnover LLC provides same-day lock service so your property is secure before the next tenant moves in."
      metaDescription="Lock changes and rekeying services in Springfield, MO for rental properties. Same-day service by FlashFix Turnover LLC — secure your property between tenants."
      icon={Lock}
      iconColor="text-purple-600"
      iconBg="bg-purple-50"
      priceRange="$45/lock"
      turnaround="Same day"
      features={[
        { title: "Deadbolt Rekeying", description: "Rekey existing deadbolts so old keys no longer work — fast and cost-effective." },
        { title: "Full Lock Replacement", description: "Replace worn or damaged locks with new, high-quality hardware." },
        { title: "Knob & Lever Sets", description: "Interior and exterior knob and lever set replacement or rekeying." },
        { title: "Master Key Systems", description: "Set up master key systems for property managers overseeing multiple units." },
        { title: "Smart Lock Installation", description: "Install keypad and smart locks for keyless entry and remote access management." },
        { title: "Mailbox Lock Changes", description: "Mailbox lock rekeying or replacement for complete security between tenants." },
      ]}
      benefits={[
        "Same-day service available — we understand turnover timelines",
        "Rekeying is more affordable than full lock replacement",
        "High-security lock brands available including Schlage and Kwikset",
        "Master key systems for multi-unit property managers",
        "Smart lock options for modern keyless entry",
        "All work performed by licensed, background-checked technicians",
        "Serving Springfield MO and surrounding Greene County communities",
      ]}
      processSteps={[
        "Request service online or call — specify number of locks and property address",
        "We confirm same-day or next-day availability",
        "Technician arrives with all hardware and tools",
        "Locks rekeyed or replaced as specified",
        "New keys cut and labeled for your records",
        "Confirmation sent with photos of completed work",
      ]}
      faqs={[
        {
          question: "What's the difference between rekeying and replacing a lock?",
          answer: "Rekeying changes the internal pins so old keys no longer work — it's faster and less expensive. Lock replacement installs entirely new hardware, which is recommended for worn, damaged, or low-security locks.",
        },
        {
          question: "How many locks does a typical rental unit have?",
          answer: "Most Springfield rental units have 2–3 locks: a front door deadbolt, front door knob, and sometimes a back door or patio door lock. We can rekey or replace all of them in a single visit.",
        },
        {
          question: "Do you offer master key systems for landlords?",
          answer: "Yes. We can set up a master key system where one key opens all units in your building while each tenant has a unique key for their unit only. This is ideal for multi-unit property managers.",
        },
        {
          question: "Can you install smart locks?",
          answer: "Yes. We install and configure smart locks including Schlage Encode, Kwikset Halo, and other keypad/Bluetooth models. Smart locks are great for vacation rentals and properties where you need remote access control.",
        },
      ]}
      relatedServices={[
        { name: "Deep Cleaning", href: "/services/cleaning" },
        { name: "Painting", href: "/services/painting" },
        { name: "Emergency Maintenance", href: "/services/emergency-maintenance" },
        { name: "Trash Outs", href: "/services/trash-outs" },
      ]}
    />
  );
}
