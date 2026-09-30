import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { QR_PATH, QR_TARGET } from "@shared/qr";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import ArView from "./pages/ArView";
import Home from "./pages/Home";
import Methodology from "./pages/Methodology";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ar" component={ArView} />
      <Route path="/metodoloji" component={Methodology} />
      {/* Safety net for the permanent QR entry: the server 302s /qr, but if a
          host ever serves the SPA shell for it instead, redirect client-side. */}
      <Route path={QR_PATH}>
        <Redirect to={QR_TARGET} replace />
      </Route>
      <Route path="/404" component={NotFound} />
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
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
