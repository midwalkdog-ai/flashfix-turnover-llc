import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Zap,
  PaintBucket,
  Hammer,
  Sparkles,
  Lock,
  Trash2,
  AlertTriangle,
  Phone,
  ChevronRight,
  TrendingUp,
  Users,
  Building2,
  Award,
} from "lucide-react";

const services = [
  {
    icon: PaintBucket,
    name: "Painting",
    description: "Interior and exterior painting with premium materials. Fast turnaround for rental units and property flips.",
    href: "/services/painting",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Hammer,
    name: "Drywall",
    description: "Patch, repair, and full drywall installation. Seamless finishes ready for paint in 24–48 hours.",
    href: "/services/drywall",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Sparkles,
    name: "Cleaning",
    description: "Deep move-out cleaning that passes the toughest inspections. Carpets, appliances, windows, and more.",
    href: "/services/cleaning",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Lock,
    name: "Lock Changes",
    description: "Same-day rekeying and lock replacement. Secure your property between tenants every time.",
    href: "/services/lock-changes",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Trash2,
    name: "Trash Outs",
    description: "Complete property cleanouts — furniture, debris, and junk removal. We haul it all away fast.",
    href: "/services/trash-outs",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: AlertTriangle,
    name: "Emergency Maintenance",
    description: "24/7 emergency response for leaks, HVAC failures, and urgent repairs. We're on call when you need us.",
    href: "/services/emergency-maintenance",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const stats = [
  { value: "500+", label: "Properties Turned Over", icon: Building2 },
  { value: "48hr", label: "Average Turnaround", icon: Clock },
  { value: "98%", label: "Client Satisfaction", icon: Star },
  { value: "24/7", label: "Emergency Response", icon: AlertTriangle },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Property Manager, Springfield MO",
    text: "FlashFix turned over 12 units for us last quarter. Every single one was done on time, on budget, and passed inspection. They're the only crew I trust.",
    rating: 5,
  },
  {
    name: "David R.",
    role: "Real Estate Investor",
    text: "I had a tenant leave a disaster. FlashFix did a full trash-out, drywall repair, paint, and deep clean in 3 days. Unbelievable speed and quality.",
    rating: 5,
  },
  {
    name: "Linda K.",
    role: "Landlord, 20+ Units",
    text: "The online request form and automatic notifications make managing multiple turnovers so easy. I get updates without having to chase anyone down.",
    rating: 5,
  },
];

const whyChoose = [
  { icon: Zap, title: "Lightning Fast", desc: "Most jobs completed within 24–72 hours of request." },
  { icon: Shield, title: "Fully Insured", desc: "Licensed, bonded, and insured for your protection." },
  { icon: CheckCircle, title: "Zero-Touch Process", desc: "Request online, get updates automatically, pay digitally." },
  { icon: TrendingUp, title: "Transparent Pricing", desc: "Upfront quotes with no hidden fees or surprises." },
];

export default function Home() {
  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                Springfield, MO's #1 Turnover Crew
              </div>
              <h1
                className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Property Turnovers
                <br />
                <span className="text-accent">Done Fast.</span>
                <br />
                Done Right.
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
                FlashFix Turnover LLC handles everything between tenants — painting, drywall, cleaning, lock changes, trash outs, and emergency repairs. One call, one crew, zero headaches.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/request-service">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-8 shadow-lg shadow-accent/30"
                  >
                    Request Service Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contractor-signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-8"
                  >
                    Join Our Crew
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 text-sm text-primary-foreground/70">
                {["Licensed & Insured", "Free Quotes", "24/7 Emergency"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Quick Service Request</div>
                    <div className="text-xs text-primary-foreground/60">Average response: under 2 hours</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {services.slice(0, 4).map((s) => (
                    <div key={s.name} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <s.icon className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-primary-foreground/90">{s.name}</span>
                      <ChevronRight className="w-4 h-4 text-primary-foreground/40 ml-auto" />
                    </div>
                  ))}
                  <div className="text-center text-xs text-primary-foreground/50 pt-1">
                    + Trash Outs & Emergency Maintenance
                  </div>
                </div>
                <Link href="/request-service">
                  <Button className="w-full mt-5 bg-accent hover:bg-accent/90 text-white font-bold">
                    Get a Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-border shadow-sm">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div
                  className="text-3xl font-black text-primary"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              What We Do
            </div>
            <h2
              className="text-3xl lg:text-4xl font-black text-primary mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Complete Turnover Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything your property needs between tenants — handled by one trusted crew in Springfield, MO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.name} href={service.href}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${service.color} group-hover:gap-2 transition-all`}>
                      Learn More <ChevronRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/request-service">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10">
                Request Any Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose FlashFix ───────────────────────────────────────── */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Award className="w-3.5 h-3.5" />
                Why FlashFix
              </div>
              <h2
                className="text-3xl lg:text-4xl font-black text-primary mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Springfield's Most Trusted Turnover Company
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We built FlashFix specifically for property managers and landlords who can't afford downtime. Our streamlined process means faster turnovers, lower vacancy costs, and happier tenants.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChoose.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{item.title}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Link href="/about">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    About Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="bg-accent hover:bg-accent/90 text-white font-semibold">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Process Steps */}
            <div className="space-y-4">
              {[
                { step: "01", title: "Submit Your Request", desc: "Fill out our quick online form with property address, service type, and your deadline." },
                { step: "02", title: "Get a Fast Quote", desc: "We review your request and send a transparent, itemized quote within 2 hours." },
                { step: "03", title: "We Get to Work", desc: "Our vetted crew arrives on schedule and completes the job to your specs." },
                { step: "04", title: "Approve & Pay", desc: "Review the completed work, approve it digitally, and pay securely online." },
              ].map((item, i) => (
                <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-sm flex-shrink-0" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{item.title}</div>
                    <div className="text-muted-foreground text-sm mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5" />
              Client Reviews
            </div>
            <h2
              className="text-3xl lg:text-4xl font-black text-primary"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              What Property Managers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl lg:text-4xl font-black mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ready to Turn Over Your Property?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join hundreds of Springfield property managers who trust FlashFix for fast, professional turnovers. Get a free quote in under 2 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/request-service">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-bold text-base px-10 shadow-lg shadow-accent/30"
                >
                  Request Service Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14175550100">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-semibold text-base px-10"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  (417) 319-1564
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-accent" />
                500+ Properties Served
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-accent" />
                Fully Licensed & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                48hr Average Turnaround
              </span>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
