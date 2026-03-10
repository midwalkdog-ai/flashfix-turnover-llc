import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Award,
  Users,
  Building2,
  Clock,
  Zap,
  Phone,
} from "lucide-react";

const team = [
  {
    name: "Marcus J.",
    role: "Founder & Operations Director",
    bio: "15+ years in property maintenance and renovation across Springfield MO. Founded FlashFix to solve the turnover bottleneck that every landlord faces.",
  },
  {
    name: "Tanya R.",
    role: "Client Relations Manager",
    bio: "Former property manager with deep understanding of what landlords need. Tanya ensures every job is communicated clearly and completed to spec.",
  },
  {
    name: "Derek S.",
    role: "Lead Contractor Coordinator",
    bio: "Manages our network of vetted contractors across all trades. Ensures the right crew is dispatched for every job, every time.",
  },
];

const values = [
  { icon: Zap, title: "Speed", desc: "We know every vacant day costs money. We move fast without cutting corners." },
  { icon: Shield, title: "Reliability", desc: "We show up when we say we will and finish what we start — every time." },
  { icon: CheckCircle, title: "Quality", desc: "Our work is done right the first time so you don't have to call us back." },
  { icon: Users, title: "Partnership", desc: "We treat every property manager like a long-term partner, not a one-time job." },
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
  {
    name: "James P.",
    role: "Commercial Property Manager",
    text: "We use FlashFix for all our residential units in Greene County. Their pricing is fair, their work is excellent, and they're always responsive.",
    rating: 5,
  },
  {
    name: "Michelle T.",
    role: "Rental Property Owner",
    text: "Called them for an emergency water leak at 11 PM. They were on-site within 90 minutes. Saved my property from serious damage. Incredible service.",
    rating: 5,
  },
  {
    name: "Robert H.",
    role: "HOA Manager",
    text: "FlashFix handles all our common area maintenance and unit turnovers. Professional, punctual, and their work quality is consistently excellent.",
    rating: 5,
  },
];

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              About FlashFix Turnover LLC
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Springfield's Trusted
              <br />
              <span className="text-accent">Property Turnover Experts</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl">
              FlashFix Turnover LLC was built by property professionals who understood the frustration of slow, unreliable turnover crews. We created a better system — one that's fast, transparent, and built specifically for Springfield MO landlords and property managers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                Our Mission
              </div>
              <h2
                className="text-3xl font-black text-primary mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Minimize Vacancy. Maximize Property Value.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every day a rental unit sits vacant costs landlords money. Our mission is simple: get your property turned over faster than anyone else in Springfield, without sacrificing quality or transparency.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We handle painting, drywall, cleaning, lock changes, trash outs, and emergency maintenance — all under one roof. No coordinating multiple contractors. No chasing down quotes. Just one call, one crew, and a property that's rent-ready fast.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2019", label: "Founded in Springfield MO" },
                  { value: "500+", label: "Properties Turned Over" },
                  { value: "48hr", label: "Average Turnaround Time" },
                  { value: "98%", label: "Client Satisfaction Rate" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted/50 rounded-xl p-4">
                    <div
                      className="text-2xl font-black text-primary"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/40 rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  About FlashFix Turnover LLC
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Legal Name:</span>
                    <span className="font-medium text-foreground">FlashFix Turnover LLC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entity Type:</span>
                    <span className="font-medium text-foreground">Limited Liability Company</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State:</span>
                    <span className="font-medium text-foreground">Missouri</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Headquarters:</span>
                    <span className="font-medium text-foreground">Springfield, MO</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Area:</span>
                    <span className="font-medium text-foreground">Springfield & Greene County</span>
                  </div>
                  <div className="flex justify-between">
                    <span>License:</span>
                    <span className="font-medium text-foreground">Licensed, Bonded & Insured</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="/request-service">
                  <Button className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold">
                    Request Service
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+14175550100" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Phone className="mr-2 w-4 h-4" />
                    Call Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-black text-primary"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border-border shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-black text-primary mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our leadership team brings decades of combined experience in property maintenance, management, and contractor coordination.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="border-border shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <div className="text-accent text-sm font-medium mb-3">{member.role}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5" />
              Client Testimonials
            </div>
            <h2
              className="text-3xl font-black text-primary"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
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

      {/* Certifications */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8 items-center text-center">
            {[
              { icon: Shield, label: "Licensed & Insured" },
              { icon: Award, label: "BBB Accredited" },
              { icon: CheckCircle, label: "Background Checked" },
              { icon: Clock, label: "24/7 Emergency Service" },
              { icon: Building2, label: "Missouri LLC" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2
            className="text-3xl font-black mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Ready to Work With Us?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join hundreds of Springfield property managers who trust FlashFix for fast, professional turnovers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/request-service">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10">
                Request Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
