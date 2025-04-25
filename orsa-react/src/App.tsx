import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Oil from "./pages/Oil";
import OilDetail from "./pages/OilDetail";
import OurBranches from "./pages/OurBranches";

// Import other pages later
// import OurItems from './pages/OurItems'
// import OurOffers from './pages/OurOffers'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oil" element={<Oil />} />
            <Route path="/oil/:id" element={<OilDetail />} />
            <Route path="/our-branches" element={<OurBranches />} />
            <Route
              path="/our-items"
              element={<div>Our Items Page (to be implemented)</div>}
            />
            <Route
              path="/our-offers"
              element={<div>Our Offers Page (to be implemented)</div>}
            />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
