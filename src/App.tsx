import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import TestEnvironmentBanner from './components/TestEnvironmentBanner';

// Regular imports instead of lazy loading to fix dynamic import issues
import LandingPage from './pages/LandingPage';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Thanks from './pages/Thanks';
import NotFound from './pages/NotFound';
import TestLogin from './pages/TestLogin';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Agent pages
import AgentStart from './pages/agent/AgentStart';
import AgentLogin from './pages/agent/AgentLogin';
import AgentDashboard from './pages/agent/AgentDashboard';
import AgentBrowseCases from './pages/agent/AgentBrowseCases';
import AgentCaseDetail from './pages/agent/AgentCaseDetail';
import AgentMyOffers from './pages/agent/AgentMyOffers';
import AgentMessages from './pages/agent/AgentMessages';
import AgentProfile from './pages/agent/AgentProfile';
import AgentArchive from './pages/agent/AgentArchive';
import AgentConfirmation from './pages/agent/AgentConfirmation';
import AgentStatistics from './pages/agent/AgentStatistics';
import AgentSignup from './pages/agent/AgentSignup';

// Seller pages
import SellerStart from './pages/seller/SellerStart';
import SellerLogin from './pages/seller/SellerLogin';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerMyCase from './pages/seller/SellerOffers';
import SellerMessages from './pages/seller/SellerMessages';
import SellerSignup from './pages/seller/SellerSignup';
import PropertyData from './pages/seller/PropertyData';
import SalePreferences from './pages/seller/SalePreferences';
import PriceInfo from './pages/seller/PriceInfo';
import UploadDocuments from './pages/seller/UploadDocuments';
import SellerOffers from './pages/seller/SellerOffers';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <TestEnvironmentBanner />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/index" element={<Index />} />
              <Route path="/om-os" element={<About />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/hvordan-virker-det" element={<HowItWorks />} />
              <Route path="/tak" element={<Thanks />} />
              <Route path="/test-login" element={<TestLogin />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Agent routes - fixed to use consistent paths */}
              <Route path="/maegler" element={<AgentLogin />} />
              <Route path="/maegler/start" element={<AgentStart />} />
              <Route path="/maegler/opret-bruger" element={<AgentSignup />} />
              <Route path="/maegler/login" element={<AgentLogin />} />
              <Route path="/maegler/dashboard" element={<AgentDashboard />} />
              <Route path="/maegler/sager" element={<AgentBrowseCases />} />
              <Route path="/maegler/gennemse-sager" element={<AgentBrowseCases />} />
              <Route path="/maegler/sag/:id" element={<AgentCaseDetail />} />
              <Route path="/maegler/mine-tilbud" element={<AgentMyOffers />} />
              <Route path="/maegler/beskeder" element={<AgentMessages />} />
              <Route path="/maegler/profil" element={<AgentProfile />} />
              <Route path="/maegler/arkiv" element={<AgentArchive />} />
              <Route path="/maegler/bekraeftelse" element={<AgentConfirmation />} />
              <Route path="/maegler/statistik" element={<AgentStatistics />} />

              {/* Seller routes - Fixed routing to match expected paths */}
              <Route path="/saelger" element={<SellerStart />} />
              <Route path="/saelger/start" element={<SellerStart />} />
              <Route path="/saelger/login" element={<SellerLogin />} />
              <Route path="/saelger/opret-bruger" element={<SellerSignup />} />
              <Route path="/saelger/opret-sag" element={<PropertyData />} />
              <Route path="/saelger/boligdata" element={<PropertyData />} />
              <Route path="/saelger/salgsønsker" element={<SalePreferences />} />
              <Route path="/saelger/prisinfo" element={<PriceInfo />} />
              <Route path="/saelger/upload-dokumenter" element={<UploadDocuments />} />
              <Route path="/saelger/dashboard" element={<SellerDashboard />} />
              <Route path="/saelger/min-sag" element={<SellerMyCase />} />
              <Route path="/saelger/tilbud" element={<SellerOffers />} />
              <Route path="/saelger/beskeder" element={<SellerMessages />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
