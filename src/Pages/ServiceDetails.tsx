import { useParams } from "react-router-dom";
import servbg from "../assets/Servbg.png";
import mobilebg from "../assets/mobilebg.png";
import Insta from "../assets/Insta.png";
import Tiktok from "../assets/Tiktok.png";
import facebook from "../assets/facebook.png";
import LinkedIn from "../assets/LinkedIn.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import photo4 from "../assets/photo4.png";
import photo5 from "../assets/photo5.png";
import { Heart, Star, Users } from "lucide-react";
import mobile1 from "../assets/mobile1.png";
import mobile2 from "../assets/mobile2.png";
import mobile3 from "../assets/mobile3.png";
import mobile4 from "../assets/mobile4.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const ServiceDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

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
      <span className="font-semibold text-2xl mb-2 text-[#FFC107]">{count}+</span>
    );
  }

  const contentData = [
    {
      id: "1",
      background: servbg,
      header: {
        title: t('ServiceDetails.header.title'),
        desc: t('ServiceDetails.header.desc'),
      },
      stats: [
        { value: <Counter end={5} />, label: t('ServiceDetails.stats.Experiences') },
        { value: <Counter end={20} />, label: t('ServiceDetails.stats.Project-done') },
        { value: <Counter end={80} />, label: t('ServiceDetails.stats.Happy-Clients') },
      ],
      projectsHeader: {
        title: t('ServiceDetails.projectsHeader.title'),
        desc: t('ServiceDetails.projectsHeader.desc'),
      },
      projects: [
        {
          title: t('ServiceDetails.projects.title1'),
          desc: t('ServiceDetails.projects.desc1'),
          image: photo1,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails.projects.title2'),
          desc: t('ServiceDetails.projects.desc2'),
          image: photo2,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails.projects.title3'),
          desc: t('ServiceDetails.projects.desc3'),
          image: photo3,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails.projects.title4'),
          desc: t('ServiceDetails.projects.desc4'),
          image: photo4,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails.projects.title5'),
          desc: t('ServiceDetails.projects.desc5'),
          image: photo5,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
      ],
    },
    {
      id: "2",
      background: mobilebg,
      header: {
        title: t('ServiceDetails2.header.title'),
        desc: t('ServiceDetails2.header.desc'),
      },
      stats: [
        { value: <Counter end={5} />, label: t('ServiceDetails.stats.Experiences') },
        { value: <Counter end={20} />, label: t('ServiceDetails.stats.Project-done') },
        { value: <Counter end={80} />, label: t('ServiceDetails.stats.Happy-Clients') },
      ],
      projectsHeader: {
        title: t('ServiceDetails2.projectsHeader.title'),
        desc: t('ServiceDetails2.projectsHeader.desc'),
      },
      projects: [
        {
          title: t('ServiceDetails2.projects.title1'),
          desc: t('ServiceDetails2.projects.desc1'),
          image: mobile1,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails2.projects.title2'),
          desc: t('ServiceDetails2.projects.desc2'),
          image: mobile2,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails2.projects.title3'),
          desc: t('ServiceDetails2.projects.desc3'),
          image: mobile3,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
        {
          title: t('ServiceDetails2.projects.title4'),
          desc: t('ServiceDetails2.projects.desc4'),
          image: mobile4,
          badges: [
            { icon: <Heart />, value: "00+" },
            { icon: <Star />, value: "20+" },
            { icon: <Users />, value: "35+" },
          ],
        },
      ],
    },
  ];

  const service = contentData.find((item) => item.id === id);
  const selectedProjects = service?.projects || [];

  return (
    <>
    {/* SEO meta tags for dynamic service details page */}
    <Helmet>
      <title>{service?.header.title || "Service Details"}</title>
      <meta name="description" content={service?.header.desc || "Details about our service"} />
      <meta property="og:title" content={service?.header.title || "Service Details"} />
      <meta property="og:description" content={service?.header.desc || "Details about our service"} />
      <meta property="og:image" content="/og-services.jpg" />
      <meta property="og:type" content="website" />
    </Helmet>

      <div
        className="relative bg-cover min-h-[110vh]"
        style={{ backgroundImage: `url(${service?.background})` }}
      >
        <div className="relative z-20 flex flex-col items-center justify-between text-center md:text-start md:items-start px-6 md:px-4 pt-[150px] max-w-7xl mx-auto gap-10 pb-20">
          <div className="w-full md:w-1/2 lg:w-auto mx-auto lg:mx-0 text-center lg:text-start text-white">
            <h1 className="text-5xl font-bold mb-4 leading-normal">
              {service?.header.title}
            </h1>
            <p className="text-lg mb-11 max-w-lg">{service?.header.desc}</p>
          </div>

          <div>
            <p className="text-white font-semibold text-[24px]">
              {t('ServiceDetails.Stay-connected')}
            </p>

            <div className="flex gap-3 mt-7 mb-5">
              <a href="https://www.instagram.com/akhdarplatform1/" target="_blank" rel="noopener noreferrer">
                <img src={Insta} alt="Instagram" className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.facebook.com/AghdarProgramming" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="facebook" className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.tiktok.com/@akhdar.platform/..." target="_blank" rel="noopener noreferrer">
                <img src={Tiktok} alt="Tiktok" className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com/in/wael-fetouh-2bab18182/" target="_blank" rel="noopener noreferrer">
                <img src={LinkedIn} alt="LinkedIn" className="w-[40px] h-[40px] transition-transform duration-300 hover:scale-110" />
              </a>
            </div>

            <div className="bg-white/20 p-6 flex flex-col md:flex-row justify-between items-center gap-6 mt-9">
              {service?.stats?.map((stat, i) => (
                <div key={i} className="text-white text-center w-full min-w-[120px] md:w-1/3 hover:scale-x-110 transition rounded-xl">
                  <h3 className="font-semibold text-2xl mb-2 text-[#FFC107]">{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#006F3C] py-24 px-6 md:px-36 text-center text-white">
        <p className="font-bold text-[40px] md:text-[60px] leading-tight mb-6">
          {service?.projectsHeader?.title}
        </p>
        <p className="font-light max-w-xl mx-auto text-lg">
          {service?.projectsHeader?.desc}
        </p>

        {selectedProjects.map((project, i) => (
          <div
            key={i}
            className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between text-white py-[16px] mt-[48px] gap-12 text-center md:text-start`}
          >
            <img src={project.image} alt={project.title} className="w-full md:w-1/2 object-cover" />
            <div className="w-full md:w-1/2">
              <h1 className="font-bold text-[24px] mb-4">{project.title}</h1>
              <p className="text-[20px] font-light">{project.desc}</p>
              <div className="flex gap-3 mt-6 flex-wrap justify-center md:justify-start">
                {project.badges.map((badge, i) => (
                  <p key={i} className="font-bold bg-[#FFC107] text-white px-4 py-2 rounded-[16px] text-sm hover:scale-110 transition flex items-center">
                    {badge.icon}
                    <span className="ml-2">{badge.value}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceDetails;
