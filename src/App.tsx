import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Page Components
import Home from "./pages/Home";
import Vault from "./components/Vault";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FocusPage from "./pages/FocusPage";
import FaithToken from "./pages/FaithToken";
import HomePage from './pages/HomePage'

<Route path="/" element={<HomePage />} />

// ✅ Vault Product Pages
import CreativeConfidenceKit from "./pages/vault/CreativeConfidenceProductPage";
import MotivationalQuotesPack from "./pages/vault/QuotesPackProductPage";
import InspirationArsenal from "./pages/vault/InspirationArsenalProductPage";

function App() {
  try {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/faith-token" element={<FaithToken />} />
          <Route path="/contact" element={<Contact />} />

          {/* Vault sub-pages */}
          <Route path="/vault/creative-confidence-kit" element={<CreativeConfidenceKit />} />
          <Route path="/vault/motivational-quotes-pack" element={<MotivationalQuotesPack />} />
          <Route path="/vault/inspiration-arsenal" element={<InspirationArsenal />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  } catch (error) {
    console.error("❌ App rendering failed:", error);
    return (
      <div className="p-4 bg-red-100 text-red-900 rounded-xl mt-10 mx-auto max-w-xl text-center">
        <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
        <p className="mt-2">Please try refreshing the page or check back later.</p>
      </div>
    );
  }
}

export default App;

