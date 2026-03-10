import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/components/PublicLayout";
import { ArrowRight, Calendar, Tag, BookOpen } from "lucide-react";

const blogPosts = [
  {
    slug: "how-to-minimize-rental-vacancy-springfield-mo",
    title: "How to Minimize Rental Vacancy in Springfield, MO: A Property Manager's Guide",
    excerpt: "Every vacant day costs money. Learn the proven strategies Springfield's top property managers use to reduce turnover time and keep their units occupied year-round.",
    category: "Property Management",
    date: "February 28, 2026",
    readTime: "6 min read",
    tags: ["Vacancy", "Property Management", "Springfield MO"],
  },
  {
    slug: "move-out-cleaning-checklist-rental-properties",
    title: "The Ultimate Move-Out Cleaning Checklist for Rental Properties",
    excerpt: "A thorough move-out clean is the difference between a full security deposit return and a dispute. Use this checklist to ensure nothing gets missed during your property turnover.",
    category: "Cleaning",
    date: "February 14, 2026",
    readTime: "5 min read",
    tags: ["Cleaning", "Checklist", "Turnover"],
  },
  {
    slug: "when-to-repaint-rental-property",
    title: "When Should You Repaint a Rental Property? Signs It's Time",
    excerpt: "Painting is one of the highest-ROI improvements you can make to a rental unit. Learn the signs that it's time to repaint and how to choose colors that attract quality tenants.",
    category: "Painting",
    date: "January 30, 2026",
    readTime: "4 min read",
    tags: ["Painting", "ROI", "Rental Tips"],
  },
  {
    slug: "drywall-repair-vs-replacement-landlord-guide",
    title: "Drywall Repair vs. Replacement: What Springfield Landlords Need to Know",
    excerpt: "Not all drywall damage is the same. This guide helps landlords decide when a simple patch will do and when full panel replacement is the smarter investment.",
    category: "Drywall",
    date: "January 15, 2026",
    readTime: "5 min read",
    tags: ["Drywall", "Repair", "Landlord Tips"],
  },
  {
    slug: "property-turnover-checklist-springfield-landlords",
    title: "The Complete Property Turnover Checklist for Springfield, MO Landlords",
    excerpt: "A step-by-step turnover checklist covering everything from move-out inspection to new tenant move-in. Use this to ensure a consistent, professional process every time.",
    category: "Property Management",
    date: "January 3, 2026",
    readTime: "8 min read",
    tags: ["Checklist", "Turnover", "Property Management"],
  },
  {
    slug: "lock-changes-between-tenants-why-its-essential",
    title: "Why Changing Locks Between Tenants Is Non-Negotiable",
    excerpt: "Many landlords skip lock changes to save money — a mistake that can cost far more in liability and security incidents. Here's why rekeying between every tenant is essential.",
    category: "Security",
    date: "December 18, 2025",
    readTime: "4 min read",
    tags: ["Security", "Lock Changes", "Tenant Safety"],
  },
];

const categories = ["All", "Property Management", "Painting", "Drywall", "Cleaning", "Security"];

export default function Blog() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              FlashFix Blog
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Property Management
              <br />
              <span className="text-accent">Tips & Resources</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Expert advice for Springfield, MO landlords and property managers. Reduce vacancy, improve turnovers, and maximize your rental income.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/40">
        <div className="container text-center">
          <h2
            className="text-2xl font-black text-primary mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Need Help With Your Next Turnover?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Put our advice into action. Request service from FlashFix Turnover LLC and get your property rent-ready fast.
          </p>
          <Link href="/request-service">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10">
              Request Service Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
