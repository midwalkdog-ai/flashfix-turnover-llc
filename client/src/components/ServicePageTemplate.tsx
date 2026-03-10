import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Clock,
  Shield,
  Star,
  ChevronRight,
} from "lucide-react";

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  heroDescription: string;
  metaDescription: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  features: ServiceFeature[];
  benefits: string[];
  faqs: ServiceFAQ[];
  processSteps: string[];
  priceRange: string;
  turnaround: string;
  relatedServices: { name: string; href: string }[];
}

export default function ServicePageTemplate({
  title,
  subtitle,
  heroDescription,
  icon: Icon,
  iconColor,
  iconBg,
  features,
  benefits,
  faqs,
  processSteps,
  priceRange,
  turnaround,
  relatedServices,
}: ServicePageProps) {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 ${iconBg} ${iconColor} rounded-full px-4 py-1.5 text-sm font-medium mb-6 bg-white/10 text-accent border border-accent/30`}>
              <Icon className="w-4 h-4" />
              {subtitle}
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {title}
              <br />
              <span className="text-accent">in Springfield, MO</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-2xl">
              {heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/request-service">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-8">
                  Request This Service
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+14175550100">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-8">
                  <Phone className="mr-2 w-4 h-4" />
                  (417) 555-0100
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                Turnaround: {turnaround}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-accent" />
                Fully Insured
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-accent" />
                Starting at {priceRange}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2
            className="text-2xl lg:text-3xl font-black text-primary mb-10 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-1">{f.title}</div>
                      <div className="text-muted-foreground text-xs leading-relaxed">{f.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Process */}
      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2
                className="text-2xl font-black text-primary mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Why Choose FlashFix for {title.split(" ")[0]}?
              </h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h2
                className="text-2xl font-black text-primary mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Our Process
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="pt-1 text-sm text-foreground">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <h2
            className="text-2xl lg:text-3xl font-black text-primary mb-10 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question} className="border-border">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-muted/40">
        <div className="container">
          <h3 className="text-lg font-bold text-primary mb-6 text-center">Related Services</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedServices.map((s) => (
              <Link key={s.href} href={s.href}>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                  {s.name}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
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
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Request {title.toLowerCase()} service today. We'll have a quote to you within 2 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/request-service">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10">
                Request Service Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+14175550100">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-10">
                <Phone className="mr-2 w-4 h-4" />
                Call (417) 555-0100
              </Button>
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
