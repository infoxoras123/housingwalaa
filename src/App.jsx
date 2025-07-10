import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ListingsPage from "./pages/ListingsPage";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/utils/ScrollToTop";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Forgotpwd from "./pages/Forgotpwd";
import CompareProperties from "./pages/CompareProperties";
import Blog from "./pages/Blog";
import EmiCalculator from "./pages/EmiCalculator";
import AddProperty from "./pages/AddPropertyForm";
import BlogPost from "./pages/BlogPost";

function App() {
  const location = useLocation();
  const path = location.pathname;

  const noNavbarFooterRoutes = ["/login", "/signup", "/forgot-password"];
  const showNavbar = !noNavbarFooterRoutes.includes(path);
  const showFooter = !noNavbarFooterRoutes.includes(path);

  return (
    <div className="flex flex-col min-h-screen bg-secondary-50">
      <ScrollToTop />

      {showNavbar && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/property/:id/:name" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<Forgotpwd />} />
          <Route path="/compare" element={<CompareProperties />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/add-property" element={<AddProperty />} />
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
