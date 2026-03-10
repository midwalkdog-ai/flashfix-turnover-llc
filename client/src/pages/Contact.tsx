import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (err) => {
      toast.error("Failed to send message. Please try calling us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitContact.mutate(form);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              Get In Touch
            </div>
            <h1
              className="text-4xl lg:text-5xl font-black mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Contact FlashFix
              <br />
              <span className="text-accent">Turnover LLC</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Have a question or ready to get started? Reach out by phone, email, or the form below. We respond within 2 hours during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Phone</div>
                      <a
                        href="tel:+14175550100"
                        className="text-primary hover:text-accent transition-colors font-medium"
                      >
                        (417) 555-0100
                      </a>
                      <div className="text-xs text-muted-foreground mt-1">
                        Emergency line: 24/7
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Email</div>
                      <a
                        href="mailto:info@flashfixturnover.com"
                        className="text-primary hover:text-accent transition-colors font-medium text-sm"
                      >
                        info@flashfixturnover.com
                      </a>
                      <div className="text-xs text-muted-foreground mt-1">
                        Response within 2 hours
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Service Area</div>
                      <div className="text-sm text-muted-foreground">
                        Springfield, MO & Greene County
                        <br />
                        Including Ozark, Nixa, Republic,
                        <br />
                        Battlefield & Strafford
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Business Hours</div>
                      <div className="text-sm text-muted-foreground space-y-0.5">
                        <div>Mon – Fri: 7:00 AM – 6:00 PM</div>
                        <div>Saturday: 8:00 AM – 4:00 PM</div>
                        <div>Sunday: Emergency Only</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm bg-destructive/5 border-destructive/20">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground mb-1 text-sm">Property Emergency?</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        For urgent issues like water leaks or broken windows, call our 24/7 emergency line.
                      </div>
                      <a href="tel:+14175550100">
                        <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white text-xs">
                          <Phone className="mr-1.5 w-3.5 h-3.5" />
                          Emergency: (417) 555-0100
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 lg:p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thanks for reaching out. We'll get back to you within 2 hours during business hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2
                        className="text-2xl font-black text-primary mb-6"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Send Us a Message
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-sm font-medium">
                              Full Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="John Smith"
                              className="mt-1.5"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email Address <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="john@example.com"
                              className="mt-1.5"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone" className="text-sm font-medium">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              placeholder="(417) 555-0000"
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="subject" className="text-sm font-medium">
                              Subject
                            </Label>
                            <Input
                              id="subject"
                              value={form.subject}
                              onChange={(e) => setForm({ ...form, subject: e.target.value })}
                              placeholder="Service inquiry, quote request..."
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="message" className="text-sm font-medium">
                            Message <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Tell us about your property and what you need..."
                            className="mt-1.5 min-h-[140px]"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-accent hover:bg-accent/90 text-white font-bold"
                          disabled={submitContact.isPending}
                        >
                          {submitContact.isPending ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          We respond within 2 hours during business hours. For emergencies, call (417) 555-0100.
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-0">
        <div className="w-full h-80 bg-muted relative overflow-hidden">
          <iframe
            title="FlashFix Turnover LLC - Springfield MO"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200614.32!2d-93.2923!3d37.2090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf62f0c9b3e4f7%3A0x7c2d3c2b3c2b3c2b!2sSpringfield%2C%20MO!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <div>
                <div className="font-semibold text-foreground text-sm">FlashFix Turnover LLC</div>
                <div className="text-xs text-muted-foreground">Springfield, MO 65801</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
