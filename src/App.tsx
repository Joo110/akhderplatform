import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

import Layout from "./MyComponents/Layout";
import Home from "./MyComponents/Home";
import ServiceDetails from "./Pages/ServiceDetails";
import Founders from "./Pages/Founders";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Articles from "./MyComponents/Articles";
import AddArticle from "./MyComponents/AddArticle";
import ArticleDetails from "./MyComponents/ArticleDetails";
import Login from "./MyComponents/Login";

import "./i18n";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider"; // تأكد من المسار

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    console.log("Current Language:", i18n.language);
  }, [i18n.language]);

  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-center" />

        <Routes>
          {/* Layout عام مع Navbar/Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="service/:id" element={<ServiceDetails />} />
            <Route path="Founder" element={<Founders />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Pages بدون Navbar/Footer */}
          <Route path="articles" element={<Articles />} />
          <Route path="articles/add" element={<AddArticle />} />
          <Route path="articles/:id" element={<ArticleDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
