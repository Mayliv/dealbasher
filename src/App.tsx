import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import DealDetail from "./pages/DealDetail";
import SearchResults from "./pages/SearchResults";
import SubmitDeal from "./pages/SubmitDeal";
import Login from "./pages/Login";
import StaticPage from "./pages/StaticPage";
import NotFound from "./pages/NotFound";
import Discussions from "./pages/Discussions";
import AdminPanel from "./pages/AdminPanel";
import CategoriesPage from "./pages/CategoriesPage";
import PromocodesPage from "./pages/PromocodesPage";
import PriceBugsPage from "./pages/PriceBugsPage";
import UserProfile from "./pages/UserProfile";
import NotificationSettings from "./pages/NotificationSettings";
import TrackingPage from "./pages/TrackingPage";
import DigestPage from "./pages/DigestPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ChallengesPage from "./pages/ChallengesPage";
import SitemapPage from "./pages/SitemapPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import GuidelinesPage from "./pages/GuidelinesPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import MobileBottomNav from "./components/MobileBottomNav";
import LiveActivityFeed from "./components/LiveActivityFeed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LocalizationProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="pb-14 md:pb-0">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/deal/:dealId" element={<DealDetail />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/submit-deal" element={<SubmitDeal />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/deals" element={<Index />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/promocodes" element={<PromocodesPage />} />
                  <Route path="/bugs" element={<PriceBugsPage />} />
                  <Route path="/freebies" element={<StaticPage />} />
                  <Route path="/discussions" element={<Discussions />} />
                  <Route path="/owner" element={<AdminPanel />} />
                  <Route path="/user/:username" element={<UserProfile />} />
                  <Route path="/settings/notifications" element={<NotificationSettings />} />
                  <Route path="/tracking" element={<TrackingPage />} />
                  <Route path="/digest" element={<DigestPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/guidelines" element={<GuidelinesPage />} />
                  <Route path="/:pageId" element={<StaticPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <MobileBottomNav />
                <LiveActivityFeed />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
