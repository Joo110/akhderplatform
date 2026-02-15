// src/MyComponents/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  // قائمة المسارات التي لا نريد إظهار الـ Navbar فيها
  const hideNavbarOn = ["/login"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {/* Navbar يظهر فقط لو مش في صفحة login */}
      {!shouldHideNavbar && <Navbar />}

      <main className="relative overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />

      {/* Fixed action buttons */}
      <nav
        className="fixed bottom-6 left-6 z-50 flex gap-4"
        aria-label="Quick contact actions"
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/+201010765069"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-3 rounded-full animate-pulse-scale shadow-lg"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>

        {/* Phone */}
        <a
          href="tel:01010765069"
          className="bg-[#FFC107] p-3 rounded-full shadow-lg animate-pulse-scale"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </nav>
    </>
  );
};

export default Layout;
