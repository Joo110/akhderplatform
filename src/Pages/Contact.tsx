// -----------------------------------------------------------------------------
// File: src/pages/Contact.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Mail as EmailIcon, Phone } from "lucide-react";
import emailjs from "emailjs-com";
import addressIcon from "../assets/address.png";
import emailIcon from "../assets/email.png";
import phoneIcon from "../assets/phone.png";
import Insta from "../assets/Insta.png";
import Tiktok from "../assets/Tiktok.png";
import facebook from "../assets/facebook.png";
import LinkedIn from "../assets/LinkedIn.png";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  Subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        "service_rwz4q9h",
        "template_044uith",
        {
          from_firstname: data.firstName,
          from_lastname: data.lastName,
          from_email: data.email,
          from_phone: data.phone,
          subject: data.Subject,
          message: data.message,
        },
        "E9X2vDGOHBoMlo1h0"
      );

      toast.success("Your message has been sent!");
      setTimeout(() => reset(), 2000);
    } catch {
      toast.error("Oops! Something went wrong.");
    }
  };

  return (
<section
  className="bg-[#006F3C] pt-[150px] pb-16 min-h-screen"
  id="Contact"
>
   <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 text-start">
          <fieldset className="flex flex-col sm:flex-row gap-2">
            <label className="w-full sm:w-1/2">
              <span className="block mb-1">{t("ContactUs.First_Name")}</span>
              <input
                {...register("firstName", { required: t("ContactUs.firstName-required") })}
                className="w-full px-3 py-2 rounded-[16px] bg-[#F1F1F1]"
              />
              {errors.firstName && <span className="text-red-500">{String(errors.firstName.message)}</span>}
            </label>

            <label className="w-full sm:w-1/2">
              <span className="block mb-1">{t("ContactUs.Last-Name")}</span>
              <input
                {...register("lastName", { required: t("ContactUs.lastName-required") })}
                className="w-full px-3 py-2 rounded-[16px] bg-[#F1F1F1]"
              />
              {errors.lastName && <span className="text-red-500">{String(errors.lastName.message)}</span>}
            </label>
          </fieldset>

          <fieldset className="flex flex-col sm:flex-row gap-2">
            <label className="w-full sm:w-1/2 relative">
              <span className="block mb-1">{t("ContactUs.Email")}</span>
              <EmailIcon className={`absolute top-10 ${i18n.language === "ar" ? "right-3" : "left-3"} w-5`} />
              <input
                type="email"
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                {...register("email", { required: t("ContactUs.Email-required") })}
                className={`w-full py-2 rounded-[16px] bg-[#F1F1F1] ${
                  i18n.language === "ar" ? "pr-10" : "pl-10"
                }`}
              />
            </label>

            <label className="w-full sm:w-1/2 relative">
              <span className="block mb-1">{t("ContactUs.Phone-number")}</span>
              <Phone className={`absolute top-10 ${i18n.language === "ar" ? "right-3" : "left-3"} w-5`} />
              <input
                type="tel"
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                {...register("phone", { required: t("ContactUs.Phone-required") })}
                className={`w-full py-2 rounded-[16px] bg-[#F1F1F1] ${
                  i18n.language === "ar" ? "pr-10" : "pl-10"
                }`}
              />
            </label>
          </fieldset>

          <label className="block mt-4">
            <span className="block mb-1">{t("ContactUs.Subject")}</span>
            <input {...register("Subject", { required: true })} className="w-full px-3 py-2 rounded-[16px] bg-[#F1F1F1]" />
          </label>

          <label className="block mt-4">
            <span className="block mb-1">{t("ContactUs.Message")}</span>
            <textarea rows={5} {...register("message", { required: true })} className="w-full px-3 py-2 rounded-[16px] bg-[#F1F1F1]" />
          </label>

          <button disabled={isSubmitting} className="w-full mt-6 bg-[#FFC107] py-3 rounded-[16px] font-bold">
            {isSubmitting ? t("ContactUs.Loading...") : t("ContactUs.Submit")}
          </button>
        </form>

        {/* Info */}
        <article className="flex-1 bg-[#006F3C] text-white rounded-[16px] p-6">
          <header className="mb-6">
            <h2 className="text-[24px] font-semibold">{t("ContactUs.Address")}</h2>
            <address className="mt-2 not-italic">
              <p className="flex gap-2"><img src={addressIcon} className="w-5" /> الرياض حي القدس شارع الملك عبدالله</p>
              <p className="flex gap-2"><img src={addressIcon} className="w-5" /> المنصوره شارع الاتوبيس القديم</p>
            </address>
          </header>

          <header className="mb-6">
            <h2 className="text-[24px] font-semibold">{t("ContactUs.Contact")}</h2>
            <p className="flex gap-2"><img src={emailIcon} className="w-5" /> <a href="mailto:akhder@akhderplatform.com">akhder@akhderplatform.com</a></p>
            <p className="flex gap-2"><img src={phoneIcon} className="w-5" /> <a href="tel:+966565925177">+966 56 592 5177</a></p>
          </header>

          <nav aria-label="Social media" className="flex gap-3 mt-4">
            {[Insta, facebook, Tiktok, LinkedIn].map((icon, i) => (
              <img key={i} src={icon} className="w-[40px] hover:scale-110 transition" />
            ))}
          </nav>
        </article>

      </div>
    </section>
  );
};

export default Contact;


