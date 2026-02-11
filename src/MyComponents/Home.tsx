import { useState } from "react";
import { Helmet } from "react-helmet-async";
import bg from "../assets/background.png";
import bg2 from "../assets/background2.png";
import Overlay from "../assets/Overlay.png";
import Overlay2 from "../assets/Overlay2.png";
import Slider from "./Slider";
import Map from "./Map";
import { useTranslation } from "react-i18next";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <main>
      {/* ✅ SEO */}
      <Helmet>
        <title>
          {isEn
            ? "Home | Professional Web & App Development Services"
            : "الرئيسية | خدمات تطوير المواقع والتطبيقات"}
        </title>

        <meta
          name="description"
          content={
            isEn
              ? "Build your business with modern websites and mobile apps. One unified platform for all your digital needs."
              : "نمّي عملك من خلال منصتنا الموحدة لخدمات المواقع الإلكترونية وتطبيقات الهاتف."
          }
        />

        <meta
          name="keywords"
          content={
            isEn
              ? "web development, app development, digital platform, tech services"
              : "تطوير مواقع, تصميم تطبيقات, منصة رقمية, خدمات تقنية"
          }
        />

        <meta
          property="og:title"
          content={
            isEn
              ? "Web & App Development Services"
              : "خدمات تطوير المواقع والتطبيقات"
          }
        />

        <meta
          property="og:description"
          content={
            isEn
              ? "All-in-one platform for creating professional websites and apps."
              : "منصة شاملة لإنشاء مواقع إلكترونية وتطبيقات احترافية."
          }
        />

        <meta property="og:image" content="/og-home.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section
        id="Home"
        className="relative min-h-[130vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${isEn ? bg : bg2})` }}
      >
        <section
          className="absolute inset-0 z-10 bg-cover"
          style={{
            backgroundImage: `url(${isEn ? Overlay : Overlay2})`,
          }}
        >
          <header
            className="flex flex-col md:flex-row items-center justify-between
              text-white px-4 mt-[50px] lg:mt-[150px]
              max-w-7xl mx-auto gap-10 py-20
              text-center md:text-start
              opacity-0 translate-y-10 animate-fade-in-up"
          >
            <div className="w-full md:w-1/2 lg:w-auto mx-auto lg:mx-0">
              <h1 className="text-5xl font-bold mb-4 leading-normal">
                {t("Home.Web&AppServices")} <br />
                {t("Home.One_Unified_Platform")}
              </h1>

              <p className="text-lg mb-11">
                {t("Home.Websites")}
                <br />
                {t("Home.built_business")}
              </p>

              <span className="inline-block animate-float">
                <a
                  href="#Contact"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="font-bold bg-[#FFC107] px-20 py-4 rounded-[16px]
                    transition-all duration-700 ease-in-out
                    text-black text-lg shadow-md
                    hover:shadow-lg transform hover:-translate-y-4 hover:scale-105
                    hover:bg-[#006F3C] hover:text-white"
                >
                  {t("Home.Contact_Us")}
                </a>
              </span>
            </div>
          </header>
        </section>
      </section>

      {/* Other Sections */}
      <Slider />
      <Map />
    </main>
  );
};

export default Home;
