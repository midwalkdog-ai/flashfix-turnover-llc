import ServicePageTemplate from "@/components/ServicePageTemplate";
import { AlertTriangle } from "lucide-react";

export default function EmergencyMaintenancePage() {
  return (
    <ServicePageTemplate
      title="Emergency Maintenance Services"
      subtitle="24/7 Emergency Response"
      heroDescription="Property emergencies don't wait for business hours. FlashFix Turnover LLC provides 24/7 emergency maintenance response in Springfield, MO for leaks, HVAC failures, electrical issues, broken windows, and more. We're on call when you need us most."
      metaDescription="24/7 emergency property maintenance in Springfield, MO. Fast response for leaks, HVAC failures, and urgent repairs by FlashFix Turnover LLC."
      icon={AlertTriangle}
      iconColor="text-orange-600"
      iconBg="bg-orange-50"
      priceRange="$125/hour"
      turnaround="Under 2 hours"
      features={[
        { title: "Water Leak Response", description: "Emergency plumbing leak containment and repair to prevent water damage and mold." },
        { title: "HVAC Emergency Repair", description: "Heating and cooling failures addressed urgently, especially critical in Missouri winters and summers." },
        { title: "Broken Window Boarding", description: "Immediate boarding and securing of broken windows to protect the property." },
        { title: "Electrical Issues", description: "Tripped breakers, exposed wiring, and non-functioning outlets addressed safely." },
        { title: "Door & Lock Emergencies", description: "Broken doors, jammed locks, and security breaches handled immediately." },
        { title: "Flood & Water Damage", description: "Emergency water extraction and initial mitigation to minimize damage." },
      ]}
      benefits={[
        "24/7 availability — we answer the phone day and night",
        "Under 2-hour response time for most Springfield MO locations",
        "Experienced technicians for plumbing, HVAC, electrical, and structural issues",
        "Transparent emergency pricing — no surprise fees",
        "Full documentation for insurance claims",
        "Follow-up repair services to restore property to full condition",
        "Trusted by Springfield property managers for reliable emergency response",
      ]}
      processSteps={[
        "Call our emergency line — answered 24/7 at (417) 555-0100",
        "Describe the emergency and provide the property address",
        "Technician dispatched immediately — typically on-site within 2 hours",
        "Emergency stabilization performed to prevent further damage",
        "Detailed assessment and documentation provided",
        "Full repair plan and quote provided for follow-up work",
      ]}
      faqs={[
        {
          question: "What qualifies as a property emergency?",
          answer: "Emergencies include active water leaks, burst pipes, HVAC failures during extreme weather, broken windows or doors compromising security, electrical hazards, and any situation that poses immediate risk to the property or occupants.",
        },
        {
          question: "How quickly can you respond to an emergency?",
          answer: "We target under 2 hours for most Springfield MO locations. Response time may vary based on distance and current demand. We'll give you an ETA when you call.",
        },
        {
          question: "Do you charge extra for after-hours emergencies?",
          answer: "Yes, after-hours and weekend emergency calls carry a premium rate. We're transparent about pricing upfront so there are no surprises. The emergency rate starts at $125/hour after hours.",
        },
        {
          question: "Do you provide documentation for insurance claims?",
          answer: "Yes. We provide detailed written reports, before and after photos, and itemized invoices that meet insurance claim requirements. We can also communicate directly with your insurance adjuster if needed.",
        },
      ]}
      relatedServices={[
        { name: "Drywall Repair", href: "/services/drywall" },
        { name: "Painting", href: "/services/painting" },
        { name: "Deep Cleaning", href: "/services/cleaning" },
        { name: "Lock Changes", href: "/services/lock-changes" },
      ]}
    />
  );
}
