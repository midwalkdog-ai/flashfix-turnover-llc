import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  CheckCircle,
  ArrowRight,
  DollarSign,
  Clock,
  Users,
  Zap,
} from "lucide-react";

const trades = [
  "Painting - Interior",
  "Painting - Exterior",
  "Drywall / Plastering",
  "Cleaning / Janitorial",
  "Carpet Cleaning",
  "Locksmith / Lock Changes",
  "Junk Removal / Trash Outs",
  "General Maintenance",
  "Plumbing",
  "Electrical",
  "HVAC",
  "Flooring",
  "Carpentry",
  "Other",
];

const availabilityOptions = [
  "Full-time (Mon–Fri)",
  "Part-time (Weekdays)",
  "Weekends Only",
  "Flexible / As Needed",
  "On-Call / Emergency Only",
];

const serviceAreas = [
  "Springfield, MO (City)",
  "Springfield & Greene County",
  "Ozark, MO",
  "Nixa, MO",
  "Republic, MO",
  "Battlefield, MO",
  "Strafford, MO",
  "All of Greene County",
  "Greene County + Surrounding",
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  trade: string;
  availability: string;
  serviceArea: string;
  yearsExperience: string;
  notes: string;
}

export default function ContractorSignup() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    trade: "",
    availability: "",
    serviceArea: "",
    yearsExperience: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const submitSignup = trpc.contractor.signup.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      toast.error("Failed to submit application. Please try calling us at (417) 319-1564.");
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.trade) newErrors.trade = "Please select your trade";
    if (!form.availability) newErrors.availability = "Please select your availability";
    if (!form.serviceArea) newErrors.serviceArea = "Please select your service area";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitSignup.mutate({
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      trade: form.trade,
      availability: form.availability,
      serviceArea: form.serviceArea,
      yearsExperience: form.yearsExperience || undefined,
      notes: form.notes || undefined,
    });
  };

  const setField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center py-20">
          <div className="text-center max-w-lg px-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1
              className="text-3xl font-black text-primary mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Application Received!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thanks for applying to join the FlashFix Turnover LLC contractor network. Our team will review your application and contact you within 1–2 business days.
            </p>
            <p className="text-muted-foreground mb-8 text-sm">
              Questions? Call us at{" "}
              <a href="tel:+14175550100" className="text-accent font-semibold">
                (417) 319-1564
              </a>
            </p>
            <Button
              onClick={() => window.location.href = "/"}
              className="bg-accent hover:bg-accent/90 text-white font-semibold"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Join Our Contractor Network
            </div>
            <h1
              className="text-3xl lg:text-4xl font-black mb-3"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Work With FlashFix Turnover LLC
            </h1>
            <p className="text-primary-foreground/80">
              Join Springfield's fastest-growing property turnover network. Consistent work, fair pay, and a team that values your craft.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 lg:p-8">
                  <h2
                    className="text-xl font-black text-primary mb-6"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Contractor Application
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          placeholder="John Smith"
                          className={`mt-1.5 ${errors.name ? "border-destructive" : ""}`}
                        />
                        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="(417) 555-0000"
                          className={`mt-1.5 ${errors.phone ? "border-destructive" : ""}`}
                        />
                        {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="john@example.com"
                        className="mt-1.5"
                      />
                    </div>

                    {/* Trade */}
                    <div>
                      <Label className="text-sm font-medium">
                        Primary Trade / Skill <span className="text-destructive">*</span>
                      </Label>
                      <Select value={form.trade} onValueChange={(v) => setField("trade", v)}>
                        <SelectTrigger className={`mt-1.5 ${errors.trade ? "border-destructive" : ""}`}>
                          <SelectValue placeholder="Select your primary trade..." />
                        </SelectTrigger>
                        <SelectContent>
                          {trades.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.trade && <p className="text-destructive text-xs mt-1">{errors.trade}</p>}
                    </div>

                    {/* Availability + Service Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Availability <span className="text-destructive">*</span>
                        </Label>
                        <Select value={form.availability} onValueChange={(v) => setField("availability", v)}>
                          <SelectTrigger className={`mt-1.5 ${errors.availability ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select availability..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availabilityOptions.map((a) => (
                              <SelectItem key={a} value={a}>{a}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.availability && <p className="text-destructive text-xs mt-1">{errors.availability}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Service Area <span className="text-destructive">*</span>
                        </Label>
                        <Select value={form.serviceArea} onValueChange={(v) => setField("serviceArea", v)}>
                          <SelectTrigger className={`mt-1.5 ${errors.serviceArea ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Select service area..." />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceAreas.map((a) => (
                              <SelectItem key={a} value={a}>{a}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.serviceArea && <p className="text-destructive text-xs mt-1">{errors.serviceArea}</p>}
                      </div>
                    </div>

                    {/* Years Experience */}
                    <div>
                      <Label htmlFor="yearsExperience" className="text-sm font-medium">
                        Years of Experience
                      </Label>
                      <Select value={form.yearsExperience} onValueChange={(v) => setField("yearsExperience", v)}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select years of experience..." />
                        </SelectTrigger>
                        <SelectContent>
                          {["Less than 1 year", "1–2 years", "3–5 years", "5–10 years", "10+ years"].map((y) => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes */}
                    <div>
                      <Label htmlFor="notes" className="text-sm font-medium">
                        Additional Information
                      </Label>
                      <Textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => setField("notes", e.target.value)}
                        placeholder="Tell us about your experience, certifications, equipment, or anything else relevant to working with FlashFix..."
                        className="mt-1.5 min-h-[100px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-base"
                      disabled={submitSignup.isPending}
                    >
                      {submitSignup.isPending ? "Submitting..." : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to be contacted by FlashFix Turnover LLC. We review all applications within 1–2 business days.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="border-border shadow-sm bg-primary text-primary-foreground">
                <CardContent className="p-5">
                  <h3 className="font-bold mb-4">Why Join FlashFix?</h3>
                  <div className="space-y-3">
                    {[
                      { icon: DollarSign, text: "Competitive, reliable pay on every job" },
                      { icon: Clock, text: "Consistent work — no slow seasons" },
                      { icon: Zap, text: "Fast job assignments via our platform" },
                      { icon: Users, text: "Professional, supportive team environment" },
                      { icon: CheckCircle, text: "Flexible scheduling to fit your life" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-start gap-2.5 text-sm">
                        <item.icon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-primary-foreground/80">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-3 text-sm">What We Look For</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Reliable and punctual",
                      "Quality craftsmanship",
                      "Professional communication",
                      "Own tools and transportation",
                      "Background check eligible",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
