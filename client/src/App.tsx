import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import RequestService from "./pages/RequestService";
import ContractorSignup from "./pages/ContractorSignup";
import Dashboard from "./pages/Dashboard";

// Service pages
import PaintingPage from "./pages/services/Painting";
import DrywallPage from "./pages/services/Drywall";
import CleaningPage from "./pages/services/Cleaning";
import LockChangesPage from "./pages/services/LockChanges";
import TrashOutsPage from "./pages/services/TrashOuts";
import EmergencyMaintenancePage from "./pages/services/EmergencyMaintenance";

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/request-service" component={RequestService} />
      <Route path="/contractor-signup" component={ContractorSignup} />
      <Route path="/dashboard" component={Dashboard} />

      {/* Service pages */}
      <Route path="/services/painting" component={PaintingPage} />
      <Route path="/services/drywall" component={DrywallPage} />
      <Route path="/services/cleaning" component={CleaningPage} />
      <Route path="/services/lock-changes" component={LockChangesPage} />
      <Route path="/services/trash-outs" component={TrashOutsPage} />
      <Route path="/services/emergency-maintenance" component={EmergencyMaintenancePage} />

      {/* Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
