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
  Upload,
  X,
  ArrowRight,
  Clock,
  Shield,
  Star,
  FileImage,
} from "lucide-react";

const serviceTypes = [
  "Painting - Interior",
  "Painting - Exterior",
  "Drywall Repair",
  "Drywall Installation",
  "Move-Out Deep Cleaning",
  "Carpet Cleaning",
  "Lock Changes / Rekeying",
  "Smart Lock Installation",
  "Trash Out / Property Cleanout",
  "Emergency Maintenance",
  "Full Turnover Package",
  "Other (describe in notes)",
];

interface FormData {
  propertyAddress: string;
  serviceType: string;
  deadline: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
}

export default function RequestService() {
  const [form, setForm] = useState<FormData>({
    propertyAddress: "",
    serviceType: "",
    deadline: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const submitRequest = trpc.serviceRequest.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({
        propertyAddress: "",
        serviceType: "",
        deadline: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        notes: "",
      });
      setPhotos([]);
    },
    onError: () => {
      toast.error("Failed to submit request. Please try calling us at (417) 319-1564.");
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.propertyAddress.trim()) newErrors.propertyAddress = "Property address is required";
    if (!form.serviceType) newErrors.serviceType = "Please select a service type";
    if (!form.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!form.contactPhone.trim()) newErrors.contactPhone = "Phone number is required";
    if (!form.contactEmail.trim()) newErrors.contactEmail = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.size < 10 * 1024 * 1024); // 10MB limit
    if (valid.length < files.length) {
      toast.error("Some files exceeded 10MB and were not added.");
    }
    setPhotos((prev) => [...prev, ...valid].slice(0, 8)); // max 8 photos
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // For now, submit without photo URLs (photos would be uploaded to S3 in production)
    submitRequest.mutate({
      propertyAddress: form.propertyAddress,
      serviceType: form.serviceType,
      deadline: form.deadline || undefined,
      contactName: form.contactName,
      contactPhone: form.contactPhone,
      contactEmail: form.contactEmail,
      notes: form.notes || undefined,
      photoUrls: [],
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
              Request Submitted!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thanks for reaching out to FlashFix Turnover LLC. We've received your service request and will contact you within 2 hours with a quote.
            </p>
            <p className="text-muted-foreground mb-8 text-sm">
              For urgent needs, call us directly at{" "}
              <a href="tel:+14173191564" className="text-accent font-semibold">
                (417) 319-1564
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-accent hover:bg-accent/90 text-white font-semibold"
              >
                Submit Another Request
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "/"}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Back to Home
              </Button>
            </div>
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
            <h1
              className="text-3xl lg:text-4xl font-black mb-3"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Request Property Service
            </h1>
            <p className="text-primary-foreground/80">
              Fill out the form below and we'll send you a detailed quote within 2 hours. No commitment required.
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
                    Service Request Details
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Property Address */}
                    <div>
                      <Label htmlFor="propertyAddress" className="text-sm font-medium">
                        Property Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="propertyAddress"
                        value={form.propertyAddress}
                        onChange={(e) => setField("propertyAddress", e.target.value)}
                        placeholder="123 Main St, Springfield, MO 65801"
                        className={`mt-1.5 ${errors.propertyAddress ? "border-destructive" : ""}`}
                      />
                      {errors.propertyAddress && (
                        <p className="text-destructive text-xs mt-1">{errors.propertyAddress}</p>
                      )}
                    </div>

                    {/* Service Type */}
                    <div>
                      <Label className="text-sm font-medium">
                        Service Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={form.serviceType}
                        onValueChange={(v) => setField("serviceType", v)}
                      >
                        <SelectTrigger className={`mt-1.5 ${errors.serviceType ? "border-destructive" : ""}`}>
                          <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.serviceType && (
                        <p className="text-destructive text-xs mt-1">{errors.serviceType}</p>
                      )}
                    </div>

                    {/* Deadline */}
                    <div>
                      <Label htmlFor="deadline" className="text-sm font-medium">
                        Requested Deadline / Date
                      </Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={form.deadline}
                        onChange={(e) => setField("deadline", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave blank if ASAP or flexible
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="border-t border-border pt-5">
                      <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                        Your Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactName" className="text-sm font-medium">
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="contactName"
                            value={form.contactName}
                            onChange={(e) => setField("contactName", e.target.value)}
                            placeholder="John Smith"
                            className={`mt-1.5 ${errors.contactName ? "border-destructive" : ""}`}
                          />
                          {errors.contactName && (
                            <p className="text-destructive text-xs mt-1">{errors.contactName}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactPhone" className="text-sm font-medium">
                            Phone Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="contactPhone"
                            type="tel"
                            value={form.contactPhone}
                            onChange={(e) => setField("contactPhone", e.target.value)}
                            placeholder="(417) 555-0000"
                            className={`mt-1.5 ${errors.contactPhone ? "border-destructive" : ""}`}
                          />
                          {errors.contactPhone && (
                            <p className="text-destructive text-xs mt-1">{errors.contactPhone}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="contactEmail" className="text-sm font-medium">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={form.contactEmail}
                          onChange={(e) => setField("contactEmail", e.target.value)}
                          placeholder="john@example.com"
                          className={`mt-1.5 ${errors.contactEmail ? "border-destructive" : ""}`}
                        />
                        {errors.contactEmail && (
                          <p className="text-destructive text-xs mt-1">{errors.contactEmail}</p>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <Label htmlFor="notes" className="text-sm font-medium">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => setField("notes", e.target.value)}
                        placeholder="Describe the condition of the property, specific areas of concern, access instructions, or any other relevant details..."
                        className="mt-1.5 min-h-[120px]"
                      />
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <Label className="text-sm font-medium">
                        Property Photos (Optional)
                      </Label>
                      <div className="mt-1.5">
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <Upload className="w-6 h-6" />
                            <span className="text-sm font-medium">Click to upload photos</span>
                            <span className="text-xs">PNG, JPG, HEIC up to 10MB each (max 8 photos)</span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                          />
                        </label>
                        {photos.length > 0 && (
                          <div className="grid grid-cols-4 gap-2 mt-3">
                            {photos.map((photo, i) => (
                              <div key={i} className="relative group">
                                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden border border-border">
                                  <FileImage className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                  >
                                    <X className="w-3 h-3 text-foreground" />
                                  </button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 truncate">{photo.name}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold text-base"
                      disabled={submitRequest.isPending}
                    >
                      {submitRequest.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Service Request
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to be contacted by FlashFix Turnover LLC regarding your request. We'll respond within 2 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="border-border shadow-sm bg-primary text-primary-foreground">
                <CardContent className="p-5">
                  <h3 className="font-bold mb-3">What Happens Next?</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      "We review your request immediately",
                      "You receive a detailed quote within 2 hours",
                      "Approve the quote and we schedule your job",
                      "Our crew arrives and completes the work",
                      "You approve the completed work digitally",
                    ].map((step, i) => (
                      <div key={i} className="flex gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className="text-primary-foreground/80">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-3">Why FlashFix?</h3>
                  <div className="space-y-2.5">
                    {[
                      { icon: Clock, text: "2-hour quote turnaround" },
                      { icon: Shield, text: "Licensed, bonded & insured" },
                      { icon: Star, text: "98% client satisfaction" },
                      { icon: CheckCircle, text: "Free quotes, no obligation" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-sm">
                        <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm border-accent/20 bg-accent/5">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-2 text-sm">Need Immediate Help?</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    For emergencies or urgent requests, call us directly.
                  </p>
                  <a href="tel:+14175550100">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold text-sm">
                      Call (417) 319-1564
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
