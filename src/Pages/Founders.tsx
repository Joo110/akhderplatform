import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import founderbg from "../assets/founderbg.png";
import Insta from "../assets/Insta.png";
import LinkedIn from "../assets/LinkedIn.png";
import Tiktok from "../assets/Tiktok.png";
import facebook from "../assets/facebook.png";
import founder1 from "../assets/founder1.png";
import founder2 from "../assets/founder2.png";
import founder3 from "../assets/founder3.png";
import founder6 from "../assets/founder6.png";
import founder7 from "../assets/founder7.png";
import founder8 from "../assets/founder8.png";
import { Helmet } from "react-helmet-async";

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 50);

    return () => clearInterval(interval);
  }, [end, duration]);

  return (
    <h3 className="font-semibold text-2xl mb-2 text-[#FFC107]">{count}+</h3>
  );
}

export default function Founders() {
  const { t } = useTranslation();

  const foundersData = [
    {
      img: founder1,
      name: t("Who-We-are.name2"),
      position: t("Who-We-are.position2"),
      description: t("Who-We-are.description2"),
    },
    {
      img: founder3,
      name: t("Who-We-are.name4"),
      position: t("Who-We-are.position4"),
      description: t("Who-We-are.description4"),
    },
    {
      img: founder2,
      name: t("Who-We-are.name3"),
      position: t("Who-We-are.position3"),
      description: t("Who-We-are.description3"),
    },
    
    {
      img: founder6,
      name: t("Who-We-are.name7"),
      position: t("Who-We-are.position7"),
      description: t("Who-We-are.description7"),
    },
    {
      img: founder7,
      name: t("Who-We-are.name8"),
      position: t("Who-We-are.position8"),
      description: t("Who-We-are.description8"),
    },
    {
      img: founder8,
      name: t("Who-We-are.name9"),
      position: t("Who-We-are.position9"),
      description: t("Who-We-are.description9"),
    },
  ];

  return (
    <>
      {/* SEO meta tags for the Founders (About Us) page */}
      <Helmet>
        <title>{t("Who-We-are.Who-we-are")} | Akhdar Platform</title>
        <meta name="description" content={t("Who-We-are.description")} />
        <meta
          property="og:title"
          content={`${t("Who-We-are.Who-we-are")} | Akhdar Platform`}
        />
        <meta property="og:description" content={t("Who-We-are.description")} />
        <meta property="og:image" content="/og-founders.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div
        className="relative bg-no-repeat bg-cover bg-center overflow-x-hidden"
        style={{ backgroundImage: `url(${founderbg})` }}
      >
        <div className=" bg-no-repeat bg-cover bg-center overflow-x-hidden relative z-20 flex flex-col items-center justify-between text-center md:text-start md:items-start px-6 md:px-4 pt-[150px] max-w-7xl mx-auto gap-10 pb-20">
          <div className="w-full md:w-1/2 lg:w-auto mx-auto lg:mx-0 text-center lg:text-start text-white">
            <h1 className="text-5xl font-bold mb-4 leading-normal">
              {t("Who-We-are.Who-we-are")}
            </h1>
            <p className="text-lg mb-11 max-w-lg mx-auto md:mx-0">
              {t("Who-We-are.description")}
            </p>
          </div>

          <div>
            <p className="text-white font-semibold text-[24px]">
              {t("Who-We-are.Stay-connected")}
            </p>
            <div className="flex gap-3 mt-7 mb-5">
              <a
                href="https://www.instagram.com/akhdarplatform1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Insta}
                  alt="Instagram"
                  className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a
                href="https://www.facebook.com/AghdarProgramming"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={facebook}
                  alt="facebook"
                  className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a
                href="https://www.tiktok.com/@akhdar.platform/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Tiktok}
                  alt="Tiktok"
                  className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/wael-fetouh-2bab18182/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={LinkedIn}
                  alt="LinkedIn"
                  className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110"
                />
              </a>
            </div>

            <div className="bg-white/20 p-6 flex flex-col md:flex-row justify-between items-center gap-6 mt-9 w-full">
              <div className="text-white text-center w-full min-w-[120px] md:w-1/3 hover:scale-x-110 transition rounded-xl">
                <Counter end={5} />
                <p>{t("Who-We-are.Experiences")}</p>
              </div>
              <div className="text-white text-center w-full min-w-[120px] md:w-1/3 hover:scale-x-110 transition rounded-xl">
                <Counter end={20} />
                <p>{t("Who-We-are.Project-done")}</p>
              </div>
              <div className="text-white text-center w-full min-w-[120px] md:w-1/3 hover:scale-x-110 transition rounded-xl">
                <Counter end={80} />
                <p>{t("Who-We-are.Happy-Clients")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#006F3C] py-24 px-6 md:px-32 text-center text-white">
        <p className="font-bold text-[40px] md:text-[60px] leading-tight mb-6">
          {t("Who-We-are.Our-Founders")}
        </p>
        <p className="font-light max-w-xl mx-auto text-lg">
          {t("Who-We-are.Proudly-led")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 justify-items-center">
          {foundersData.map((founder, index) => (
            <div
              key={index}
              className="relative w-full sm:max-w-[340px] lg:max-w-[380px] opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute top-4 right-4 w-full h-full bg-[#FFC107] rounded-xl z-0"></div>
              <div className="relative bg-white rounded-xl shadow-md p-10 z-10 hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-3 min-h-[430px]">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-[#333]">{founder.name}</h3>
                  <p className="text-[#FFC107] font-medium">{founder.position}</p>
                  <p className="text-gray-600 mt-2 text-sm text-center">{founder.description}</p>
                </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
