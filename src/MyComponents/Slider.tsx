import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WebIcon from "../assets/webicon.png";
import MobileIcon from "../assets/mobileicon.png";
import DatabaseIcon from "../assets/databaseicon.png";
import marketing from "../assets/Marketing.png";
import Advertising from "../assets/Advertising.png";
import Motion from "../assets/Motion.png";
import Design from "../assets/Design.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CardSlider = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const cards = [
    { id: 1, img: WebIcon, title: t("sliders.title1"), desc: t("sliders.desc1"), active: true },
    { id: 2, img: MobileIcon, title: t("sliders.title2"), desc: t("sliders.desc2"), active: true },
    { id: 3, img: DatabaseIcon, title: t("sliders.title3"), desc: t("sliders.desc3"), active: false },
    { id: 4, img: marketing, title: t("sliders.title4"), desc: t("sliders.desc4"), active: false },
    { id: 5, img: Advertising, title: t("sliders.title5"), desc: t("sliders.desc5"), active: false },
    { id: 6, img: Motion, title: t("sliders.title6"), desc: t("sliders.desc6"), active: false },
    { id: 7, img: Design, title: t("sliders.title7"), desc: t("sliders.desc7"), active: false },
  ];

  return (
    <section
      id="services"
      className="relative z-10 -mt-40 px-4 sm:px-10 md:px-28"
      aria-labelledby="services-heading"
    >
      <h2 id="services-heading" className="sr-only">
        Services
      </h2>

      <Swiper
        key={i18n.language}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!,
        }}
        spaceBetween={10}
        slidesPerView={1.2}
        speed={800}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1.1 },
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
          1280: { slidesPerView: 3 },
        }}
        onBeforeInit={(swiper: SwiperType) => {
          // تأكد من الـnavigation موجود
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current!;
            swiper.params.navigation.nextEl = nextRef.current!;
          }
        }}
        className="pb-10"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={card.id}>
            <article
              onClick={() => card.active && navigate(`/service/${card.id}`)}
              className={`p-5 h-[340px] rounded-lg shadow-lg text-center max-w-[300px] mx-auto
                transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl
                ${index % 2 === 0 ? "bg-white text-black" : "bg-[#006F3C] text-white"}
                ${card.active ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <img
                src={card.img}
                alt={card.title}
                loading="lazy"
                className="w-[100px] h-[100px] mx-auto mt-5 animate-float"
              />

              <header className="px-4 pt-[40px] mb-10">
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm">{card.desc}</p>
              </header>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={prevRef}
        aria-label="Previous service"
        className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-10
          bg-white border-2 border-green-600 text-green-600
          p-2 rounded-full shadow-md
          hover:bg-green-600 hover:text-white transition"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        ref={nextRef}
        aria-label="Next service"
        className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-10
          bg-white border-2 border-green-600 text-green-600
          p-2 rounded-full shadow-md
          hover:bg-green-600 hover:text-white transition"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
};

export default CardSlider;
