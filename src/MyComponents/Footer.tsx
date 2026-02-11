import Logo from "../assets/logo.png";
import Insta from "../assets/Insta.png";
import LinkedIn from "../assets/LinkedIn.png";
import Tiktok from "../assets/Tiktok.png";
import facebook from "../assets/facebook.png";

import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <footer id="contact" className="bg-[#004324]" dir={isAr ? "rtl" : "ltr"}>
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div
          className={`flex flex-col md:flex-row items-center md:items-start text-center ${
            isAr ? "md:text-right" : "md:text-left"
          } gap-30`}
        >
          {/* Left */}
          <section className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <img src={Logo} className="w-44 h-44" alt="Akhdar platform logo" />

            <h2 className="text-3xl text-white font-bold max-w-xl leading-snug">
              {t("Footer.Web&AppServices")}
              <br />
              {t("Footer.One-Unified-Platform")}
            </h2>

            <nav
              aria-label="Social media"
              className="flex gap-3 mt-7 mb-5"
            >
              <a
                href="https://www.instagram.com/akhdarplatform1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Insta} alt="Instagram" className="w-[40px] h-[40px] hover:scale-110 transition" />
              </a>

              <a
                href="https://www.facebook.com/AghdarProgramming"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" className="w-[40px] h-[40px] hover:scale-110 transition" />
              </a>

              <a
                href="https://www.tiktok.com/@akhdar.platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Tiktok} alt="TikTok" className="w-[40px] h-[40px] hover:scale-110 transition" />
              </a>

              <a
                href="https://www.linkedin.com/company/greenplatfor/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={LinkedIn} alt="LinkedIn" className="w-[40px] h-[40px] hover:scale-110 transition" />
              </a>
            </nav>
          </section>

          {/* Right */}
          <section className="flex items-start gap-8 md:gap-12 w-full md:w-2/3">
            <span className="hidden md:block w-[2px] h-[350px] bg-white rounded" aria-hidden />

            <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-white w-full my-auto">
              {/* Links */}
              <section>
                <h3 className="text-3xl mb-4 text-[#FFC107]">
                  {t("Footer.Quick-Links")}
                </h3>
                <ul className="space-y-6">
                  <li>
                    <HashLink smooth to="/#" className="text-xl underline hover:text-[#FFC107]">
                      {t("Footer.Home")}
                    </HashLink>
                  </li>
                  <li>
                    <HashLink smooth to="/#services" className="text-xl underline hover:text-[#FFC107]">
                      {t("Footer.Services")}
                    </HashLink>
                  </li>
                  <li>
                    <HashLink smooth to="/#Contact" className="text-xl underline hover:text-[#FFC107]">
                      {t("Footer.Contact-us")}
                    </HashLink>
                  </li>
                  <li>
                    <HashLink smooth to="/#about" className="text-xl underline hover:text-[#FFC107]">
                      {t("Footer.About-us")}
                    </HashLink>
                  </li>
                </ul>
              </section>

              {/* Services */}
              <section>
                <h3 className="text-3xl mb-4 text-[#FFC107]">
                  {t("Footer.Services")}
                </h3>
                <ul className="space-y-6 text-xl">
                  <li className="hover:text-[#FFC107]">{t("Footer.websites")}</li>
                  <li className="hover:text-[#FFC107]">{t("Footer.Mobile-application")}</li>
                  <li className="hover:text-[#FFC107]">{t("Footer.Database")}</li>
                </ul>
              </section>

              {/* Contact */}
              <address className="not-italic">
                <h3 className="text-3xl mb-4 text-[#FFC107]">
                  {t("Footer.Contact-us")}
                </h3>
                <ul className="space-y-6 text-xl">
                  <li>
                    <a
                      href="mailto:akhder@akhderplatform.com"
                      className="underline hover:text-[#FFC107]"
                    >
                      akhder@akhderplatform.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+966565925177"
                      className="underline hover:text-[#FFC107]"
                      dir="ltr"
                    >
                      +20 150 7690703
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+201010765069"
                      className="underline hover:text-[#FFC107]"
                      dir="ltr"
                    >
                      +20 103 105 7883
                    </a>
                  </li>
                </ul>
              </address>
            </nav>
          </section>
        </div>

        <hr className="h-[2px] max-w-[90%] md:max-w-[1000px] mx-auto bg-white rounded mt-6" />

        <p className="text-center text-white py-7">
          {t("Footer.Copyright")}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
