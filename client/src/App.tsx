import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Track from "./pages/Track";
import TrackingPage from "./pages/TrackingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminShipments from "./pages/AdminShipments";
import CreateShipmentPage from "./pages/CreateShipmentPage";
import ShipmentDetailPage from "./pages/ShipmentDetailPage";
import AirFreight from "./pages/services/AirFreight";
import SeaFreight from "./pages/services/SeaFreight";
import RoadTransportation from "./pages/services/RoadTransportation";
import Warehousing from "./pages/services/Warehousing";
import SecureLogistics from "./pages/services/SecureLogistics";
import PackagingStorage from "./pages/services/PackagingStorage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/services/air-freight"} component={AirFreight} />
      <Route path={"/services/sea-freight"} component={SeaFreight} />
      <Route path={"/services/road-transportation"} component={RoadTransportation} />
      <Route path={"/services/warehousing"} component={Warehousing} />
      <Route path={"/services/secure-logistics"} component={SecureLogistics} />
      <Route path={"/services/packaging-storage"} component={PackagingStorage} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/track"} component={Track} />
      <Route path={"/track/:code"} component={TrackingPage} />
      <Route path={"/admin/login"} component={AdminLoginPage} />
      <Route path={"/admin/dashboard"} component={AdminDashboard} />
      <Route path={"/admin/shipments"} component={AdminShipments} />
      <Route path={"/admin/shipments/create"} component={CreateShipmentPage} />
      <Route path={"/admin/shipments/:id"} component={ShipmentDetailPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
