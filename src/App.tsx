import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RegisterYourStay from "./pages/RegisterYourStay";
import RegistrationSubmitted from "./pages/RegistrationSubmitted";
import Dashboard from "./pages/Dashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register-your-stay" element={<RegisterYourStay />} />
            <Route path="/registration-submitted" element={<RegistrationSubmitted />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
