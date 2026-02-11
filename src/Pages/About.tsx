// -----------------------------------------------------------------------------
// File: src/pages/About.tsx
import React from "react";
import AboutPhoto from "../assets/AboutPhoto.png";
import AboutIcon1 from "../assets/AboutIcon1.png";
import AboutIcon2 from "../assets/AboutIcon2.png";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
<section
  className="bg-[#006F3C] pt-[150px] pb-16 min-h-screen"
  id="about"
>
      <div className="max-w-7xl mx-auto px-4">
        <article className="flex flex-col md:flex-row items-center justify-between gap-10 text-white text-center md:text-start">

          {/* Image */}
          <figure className="opacity-0 translate-y-10 animate-fade-in-up">
            <img
              src={AboutPhoto}
              alt="About Akhdar Company"
              className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-cover mx-auto"
            />
          </figure>

          {/* Content */}
          <div>
            <header className="flex items-start gap-4">
              <span className="w-[8px] h-[137px] bg-[#FFC107] rounded" aria-hidden="true"></span>

              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 opacity-0 translate-y-10 animate-fade-in-up animation-delay-[200ms]">
                  {t("AboutUs.About_us")}
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl max-w-xl opacity-0 translate-y-10 animate-fade-in-up animation-delay-[400ms]">
                  {t("AboutUs.Akhdar_delivers")}
                </p>
              </div>
            </header>

            {/* Features */}
            <ul className="flex flex-col gap-6 mt-10">
              <li className="flex items-start gap-4 opacity-0 translate-y-10 animate-fade-in-up animation-delay-[600ms]">
                <img
                  src={AboutIcon1}
                  alt="Specialized Services Icon"
                  className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
                />
                <p className="text-sm md:text-base lg:text-lg max-w-xl leading-relaxed min-h-[96px]">
                  {t("AboutUs.We_specialize")}
                </p>
              </li>

              <li className="flex items-start gap-4 opacity-0 translate-y-10 animate-fade-in-up animation-delay-[800ms]">
                <img
                  src={AboutIcon2}
                  alt="Quality Offerings Icon"
                  className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
                />
                <p className="text-sm md:text-base lg:text-lg max-w-xl leading-relaxed min-h-[96px]">
                  {t("AboutUs.We_offer")}
                </p>
              </li>
            </ul>
          </div>

        </article>
      </div>
    </section>
  );
};

export default About;