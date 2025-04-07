
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import DealDetail from "./pages/DealDetail";
import SearchResults from "./pages/SearchResults";
import SubmitDeal from "./pages/SubmitDeal";
import Login from "./pages/Login";
import StaticPage from "./pages/StaticPage";
import NotFound from "./pages/NotFound";
import Discussions from "./pages/Discussions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/deal/:dealId" element={<DealDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/submit-deal" element={<SubmitDeal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/deals" element={<Index />} />
            <Route path="/freebies" element={<StaticPage />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/:pageId" element={<StaticPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
