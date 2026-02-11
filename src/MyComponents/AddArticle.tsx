// src/components/AddArticle.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type FormValues = {
  title: string;
  excerpt?: string;
  content: string;
  lang?: string;
};

const AddArticle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { lang: i18n.language || "en" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await addDoc(collection(db, "articles"), {
        title: data.title,
        excerpt: data.excerpt || "",
        content: data.content,
        lang: data.lang || i18n.language || "en",
        createdAt: serverTimestamp(),
      });

      toast.success(t("Articles.AddedSuccessfully"));
      reset({ title: "", excerpt: "", content: "", lang: i18n.language || "en" });
    } catch (err) {
      console.error(err);
      toast.error(t("Articles.AddError"));
    }
  };

  const isRTL = i18n.language === "ar";

  return (
    <section className="my-6 sm:my-8 md:my-12 w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#006F3C] to-[#FFC107] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              {t("Articles.AddNew")}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Title Field */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Title")} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: true })}
                placeholder={t("Articles.TitlePlaceholder")}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent ${
                  errors.title ? "border-red-400" : "border-gray-200"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.title && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {isRTL ? "هذا الحقل مطلوب" : "This field is required"}
                </p>
              )}
            </div>

            {/* Excerpt Field */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Excerpt")}
              </label>
              <input
                {...register("excerpt")}
                placeholder={t("Articles.ExcerptPlaceholder")}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent"
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>

            {/* Content Field */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Content")} <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("content", { required: true })}
                rows={8}
                placeholder={t("Articles.ContentPlaceholder")}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent resize-none ${
                  errors.content ? "border-red-400" : "border-gray-200"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.content && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {isRTL ? "هذا الحقل مطلوب" : "This field is required"}
                </p>
              )}
            </div>

            {/* Language Select */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
              <label className="text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Language")}
              </label>
              <select 
                {...register("lang")} 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white border-2 border-gray-200 font-medium cursor-pointer transition-all hover:border-[#006F3C] focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent"
              >
                <option value="ar">العربية 🇪🇬</option>
                <option value="en">English 🇬🇧</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#006F3C] to-[#00934D] hover:from-[#005A31] hover:to-[#007A40] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t("Articles.Saving")}
                </span>
              ) : (
                t("Articles.AddButton")
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddArticle;