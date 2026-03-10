import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Building2,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Eye,
  Zap,
} from "lucide-react";

// Fallback chart data for demo
const DEMO_MONTHLY = [
  { month: "2025-09", jobs: 8, revenue: 4200 },
  { month: "2025-10", jobs: 12, revenue: 6800 },
  { month: "2025-11", jobs: 10, revenue: 5500 },
  { month: "2025-12", jobs: 15, revenue: 9200 },
  { month: "2026-01", jobs: 18, revenue: 11400 },
  { month: "2026-02", jobs: 22, revenue: 14600 },
  { month: "2026-03", jobs: 19, revenue: 12800 },
];

function formatMonth(m: string) {
  const [year, month] = m.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString("default", { month: "short", year: "2-digit" });
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    assigned: { label: "Assigned", className: "bg-blue-100 text-blue-800 border-blue-200" },
    completed: { label: "Completed", className: "bg-green-100 text-green-800 border-green-200" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 border-red-200" },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${c.className}`}>
      {c.label}
    </span>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    unpaid: { label: "Unpaid", className: "bg-red-100 text-red-800 border-red-200" },
    partial: { label: "Partial", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    paid: { label: "Paid", className: "bg-green-100 text-green-800 border-green-200" },
  };
  const c = config[status] || config.unpaid;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${c.className}`}>
      {c.label}
    </span>
  );
}

function ContractorStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending Review", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    active: { label: "Active", className: "bg-green-100 text-green-800 border-green-200" },
    inactive: { label: "Inactive", className: "bg-gray-100 text-gray-800 border-gray-200" },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${c.className}`}>
      {c.label}
    </span>
  );
}

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "contractors" | "contacts">("overview");

  const statsQuery = trpc.serviceRequest.stats.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const jobsQuery = trpc.serviceRequest.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const monthlyQuery = trpc.serviceRequest.monthlyData.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const contractorsQuery = trpc.contractor.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const contactsQuery = trpc.contact.list.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });

  const updateStatus = trpc.serviceRequest.updateStatus.useMutation({
    onSuccess: () => {
      jobsQuery.refetch();
      statsQuery.refetch();
      toast.success("Status updated");
    },
  });

  const updateContractorStatus = trpc.contractor.updateStatus.useMutation({
    onSuccess: () => {
      contractorsQuery.refetch();
      toast.success("Contractor status updated");
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm px-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-primary mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Dashboard Login
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Sign in to access the FlashFix Turnover management dashboard.
          </p>
          <a href={getLoginUrl()}>
            <Button className="bg-accent hover:bg-accent/90 text-white font-semibold w-full">
              Sign In to Dashboard
            </Button>
          </a>
          <Link href="/">
            <Button variant="ghost" className="w-full mt-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm px-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Access Restricted</h1>
          <p className="text-muted-foreground mb-4 text-sm">
            The dashboard is only accessible to FlashFix administrators.
          </p>
          <Link href="/">
            <Button variant="outline" className="border-primary text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = statsQuery.data;
  const jobs = jobsQuery.data ?? [];
  const monthlyData = monthlyQuery.data?.length ? monthlyQuery.data : DEMO_MONTHLY;
  const contractors = contractorsQuery.data ?? [];
  const contacts = contactsQuery.data ?? [];

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "jobs", label: `Jobs (${jobs.length})`, icon: Building2 },
    { id: "contractors", label: `Contractors (${contractors.length})`, icon: Users },
    { id: "contacts", label: `Messages (${contacts.length})`, icon: Eye },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-primary text-primary-foreground border-b border-white/10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  FlashFix Dashboard
                </div>
                <div className="text-xs text-primary-foreground/60">
                  Welcome, {user.name || "Admin"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  statsQuery.refetch();
                  jobsQuery.refetch();
                  monthlyQuery.refetch();
                  contractorsQuery.refetch();
                }}
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                Refresh
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Website
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* ── Overview Tab ─────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Pending Jobs",
                  value: stats?.pending ?? 0,
                  icon: Clock,
                  color: "text-yellow-600",
                  bg: "bg-yellow-50",
                },
                {
                  label: "Assigned Jobs",
                  value: stats?.assigned ?? 0,
                  icon: Building2,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  label: "Completed Jobs",
                  value: stats?.completed ?? 0,
                  icon: CheckCircle,
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "Total Revenue",
                  value: `$${Number(stats?.totalRevenue ?? 0).toLocaleString()}`,
                  icon: DollarSign,
                  color: "text-accent",
                  bg: "bg-orange-50",
                },
              ].map((stat) => (
                <Card key={stat.label} className="border-border shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-foreground" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold">Monthly Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={monthlyData.map((d) => ({ ...d, month: formatMonth(d.month) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="jobs" fill="oklch(0.26 0.09 248)" radius={[4, 4, 0, 0]} name="Jobs" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={monthlyData.map((d) => ({ ...d, month: formatMonth(d.month) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
                      <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="oklch(0.66 0.19 44)"
                        strokeWidth={2.5}
                        dot={{ fill: "oklch(0.66 0.19 44)", r: 4 }}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Jobs */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold">Recent Jobs</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("jobs")} className="text-accent hover:text-accent/80">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Address</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Service</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Payment</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.slice(0, 5).map((job) => (
                        <tr key={job.id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-2.5 px-3 font-medium text-foreground max-w-[180px] truncate">
                            {job.propertyAddress}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground max-w-[140px] truncate">
                            {job.serviceType}
                          </td>
                          <td className="py-2.5 px-3">
                            <StatusBadge status={job.status} />
                          </td>
                          <td className="py-2.5 px-3">
                            <PaymentBadge status={job.paymentStatus} />
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground text-xs">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {jobs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-muted-foreground text-sm">
                            No jobs yet. Service requests will appear here.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Jobs Tab ──────────────────────────────────────────────── */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-primary" style={{ fontFamily: "Montserrat, sans-serif" }}>
                All Service Requests
              </h2>
              <Link href="/request-service">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
                  + New Request
                </Button>
              </Link>
            </div>
            <Card className="border-border shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Property</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Service</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Contact</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Deadline</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Quote</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Payment</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-3 px-4 text-muted-foreground font-mono text-xs">#{job.id}</td>
                          <td className="py-3 px-4 font-medium text-foreground max-w-[160px]">
                            <div className="truncate">{job.propertyAddress}</div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground max-w-[140px]">
                            <div className="truncate">{job.serviceType}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-foreground text-xs font-medium">{job.contactName}</div>
                            <div className="text-muted-foreground text-xs">{job.contactPhone}</div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">
                            {job.deadline || "ASAP"}
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={job.status} />
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">
                            {job.quoteAmount ? `$${job.quoteAmount}` : "—"}
                          </td>
                          <td className="py-3 px-4">
                            <PaymentBadge status={job.paymentStatus} />
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              value={job.status}
                              onValueChange={(v) =>
                                updateStatus.mutate({
                                  id: job.id,
                                  status: v as "pending" | "assigned" | "completed" | "cancelled",
                                })
                              }
                            >
                              <SelectTrigger className="h-7 text-xs w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                      {jobs.length === 0 && (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-muted-foreground text-sm">
                            No service requests yet. They'll appear here when submitted.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Contractors Tab ───────────────────────────────────────── */}
        {activeTab === "contractors" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-primary" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Contractor Applications
              </h2>
              <Link href="/contractor-signup">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
                  + Add Contractor
                </Button>
              </Link>
            </div>
            <Card className="border-border shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Trade</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Contact</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Availability</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Service Area</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Experience</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Jobs Done</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractors.map((c) => (
                        <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-3 px-4 font-medium text-foreground">{c.name}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{c.trade}</td>
                          <td className="py-3 px-4">
                            <div className="text-xs font-medium">{c.phone}</div>
                            {c.email && <div className="text-xs text-muted-foreground">{c.email}</div>}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{c.availability}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{c.serviceArea}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{c.yearsExperience || "—"}</td>
                          <td className="py-3 px-4 text-center font-semibold text-foreground">{c.jobsCompleted}</td>
                          <td className="py-3 px-4">
                            <ContractorStatusBadge status={c.status} />
                          </td>
                          <td className="py-3 px-4">
                            <Select
                              value={c.status}
                              onValueChange={(v) =>
                                updateContractorStatus.mutate({
                                  id: c.id,
                                  status: v as "pending" | "active" | "inactive",
                                })
                              }
                            >
                              <SelectTrigger className="h-7 text-xs w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                      {contractors.length === 0 && (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-muted-foreground text-sm">
                            No contractor applications yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Contacts Tab ──────────────────────────────────────────── */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-primary" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Contact Messages
            </h2>
            <Card className="border-border shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Phone</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Subject</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Message</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((msg) => (
                        <tr key={msg.id} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-3 px-4 font-medium text-foreground">{msg.name}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{msg.email}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">{msg.phone || "—"}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs max-w-[120px] truncate">
                            {msg.subject || "General"}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs max-w-[200px] truncate">
                            {msg.message}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                            No contact messages yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
