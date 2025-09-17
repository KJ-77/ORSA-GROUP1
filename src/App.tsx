import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Oil from "./pages/Oil";
import OilDetail from "./pages/OilDetail";
import OurBranches from "./pages/OurBranches";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

// Import other pages later
// import OurItems from './pages/OurItems'
// import OurOffers from './pages/OurOffers'

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/oil" element={<Oil />} />
              <Route path="/oil/:id" element={<OilDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/our-branches" element={<OurBranches />} />
              <Route path="/auth" element={<Auth />} />
              {/* <Route
                  path="/our-items"
                  element={<div>Our Items Page (to be implemented)</div>}
                />
                <Route
                  path="/our-offers"
                  element={<div>Our Offers Page (to be implemented)</div>}
                /> */}
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
