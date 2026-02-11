// File: src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface NavItem {
  to: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { to: "/#Home", label: t("Navbar.Home") },
    { to: "/#services", label: t("Navbar.Services") },
    { to: "/about", label: t("Navbar.About_us") }, // now separate page
    { to: "/contact", label: t("Navbar.Contact_us") }, // now separate page
  ];

  const renderLink = (to: string, className: string, onClick?: () => void, children?: React.ReactNode) => {
    // if it is an in-page anchor like "/#id" keep using HashLink
    if (to.startsWith("/#")) {
      return (
        <HashLink smooth to={to} className={className} onClick={onClick}>
          {children}
        </HashLink>
      );
    }

    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#000000cc] backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl px-4 flex items-center justify-between min-h-[70px] md:min-h-[100px] mx-auto">
        {/* Logo */}
        <HashLink to="/" aria-label="Home">
          <img
            src={Logo}
            alt="Akhdar platform logo"
            className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
        </HashLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              {renderLink(
                to,
                "text-lg lg:text-xl hover:text-[#FFC107] relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#FFC107] after:transition-all after:duration-500 hover:after:w-full",
                undefined,
                label
              )}
            </li>
          ))}

          <li>
            <Link
              to="/founder"
              className="text-lg lg:text-xl hover:text-[#FFC107] relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#FFC107] after:transition-all after:duration-500 hover:after:w-full"
            >
              {t("Navbar.Who_We_are")}
            </Link>
          </li>

          {/* Articles Link - Desktop */}
          <li>
           <Link
  to="/articles"
  className="text-lg lg:text-xl hover:text-[#FFC107] relative
             after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
             after:bg-[#FFC107] after:transition-all after:duration-500
             hover:after:w-full"
>
  {t("Navbar.Articles")}
</Link>

          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-3 items-center">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          className="absolute top-full right-4 w-[85vw] max-w-[260px] px-4 py-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl shadow-black/30 z-50 md:hidden animate-slideDown"
        >
          <ul className="flex flex-col gap-2 text-center">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                {renderLink(
                  to,
                  "text-base sm:text-lg hover:text-[#FFC107] transition",
                  () => setMenuOpen(false),
                  label
                )}
              </li>
            ))}

            <li>
              <Link
                to="/founder"
                className="text-base sm:text-lg hover:text-[#FFC107] transition"
                onClick={() => setMenuOpen(false)}
              >
                {t("Navbar.Who_We_are")}
              </Link>
            </li>

            {/* Articles Link - Mobile */}
            <li>
              <Link
                to="/articles"
                className="text-base sm:text-lg hover:text-[#FFC107] transition flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t("Navbar.Articles")}
              </Link>
            </li>

            <li className="pt-3">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;