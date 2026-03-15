import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Zap,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";

const services = [
  { name: "Painting", href: "/services/painting" },
  { name: "Drywall", href: "/services/drywall" },
  { name: "Cleaning", href: "/services/cleaning" },
  { name: "Lock Changes", href: "/services/lock-changes" },
  { name: "Trash Outs", href: "/services/trash-outs" },
  { name: "Emergency Maintenance", href: "/services/emergency-maintenance" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", children: services },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2 hidden md:block">
        <div className="container flex justify-between items-center">
          <span className="text-primary-foreground/80">
            Serving Springfield, MO & Surrounding Areas
          </span>
          <div className="flex items-center gap-6">
            <a
              href="tel:+14175550100"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (417) 319-1564
            </a>
            <a
              href="mailto:flashfixturnover@gmail.com"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              flashfixturnover@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border"
            : "bg-white border-b border-border"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" fill="currentColor" />
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-lg text-primary leading-none" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    FlashFix
                  </div>
                  <div className="text-xs text-muted-foreground leading-none">
                    Turnover LLC
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-muted transition-colors">
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-border py-1 z-50">
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <div className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary cursor-pointer transition-colors">
                              {child.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.name} href={link.href}>
                    <div
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                        location === link.href
                          ? "text-primary bg-muted"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {link.name}
                    </div>
                  </Link>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contractor-signup">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Join as Contractor
                </Button>
              </Link>
              <Link href="/request-service">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Request Service
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-md"
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {servicesOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href}>
                              <div className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md cursor-pointer">
                                {child.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href}>
                      <div className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-md cursor-pointer">
                        {link.name}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-border mt-3">
                <Link href="/request-service">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    Request Service
                  </Button>
                </Link>
                <Link href="/contractor-signup">
                  <Button variant="outline" className="w-full border-primary text-primary">
                    Join as Contractor
                  </Button>
                </Link>
              </div>
              <div className="pt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <a href="tel:+14175550100" className="flex items-center gap-1 hover:text-primary">
                  <Phone className="w-3.5 h-3.5" /> (417) 319-1564
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  FlashFix Turnover LLC
                </span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
                Springfield's trusted property turnover specialists. Fast, professional, and fully insured.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
                Services
              </h4>
              <ul className="space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href}>
                      <span className="text-primary-foreground/70 hover:text-accent transition-colors cursor-pointer">
                        {s.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                  { name: "Request Service", href: "/request-service" },
                  { name: "Contractor Signup", href: "/contractor-signup" },
                  { name: "Dashboard", href: "/dashboard" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <span className="text-primary-foreground/70 hover:text-accent transition-colors cursor-pointer">
                        {l.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-accent">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                  <a href="tel:+14175550100" className="hover:text-accent transition-colors">
                    (417) 319-1564
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                  <a href="mailto:flashfixturnover@gmail.com" className="hover:text-accent transition-colors">
                    flashfixturnover@gmail.com
                  </a>
                </li>
                <li className="text-primary-foreground/60 text-xs mt-2">
                  Mon–Fri: 7:00 AM – 6:00 PM<br />
                  Emergency: 24/7
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
            <p>© {new Date().getFullYear()} FlashFix Turnover LLC. All rights reserved. Springfield, MO.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy">
                <span className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</span>
              </Link>
              <Link href="/terms-of-service">
                <span className="hover:text-accent transition-colors cursor-pointer">Terms of Service</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
