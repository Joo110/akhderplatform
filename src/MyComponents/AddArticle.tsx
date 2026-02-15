// src/components/AddArticle.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useArticles } from "../hooks/useArticles";
import type { CreateArticlePayload } from "../types/article";

type FormValues = {
  Title: string;
  Description: string;
  Hyperlink: string;
  AltText: string;
  Picture?: FileList;
};

const AddArticle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { create } = useArticles();
  const [imagePreview, setImagePreview] = useState<string>("");
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting },
    watch 
  } = useForm<FormValues>();

  const pictureFile = watch("Picture");

  React.useEffect(() => {
    if (pictureFile && pictureFile.length > 0) {
      const file = pictureFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  }, [pictureFile]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: CreateArticlePayload = {
        Title: data.Title,
        Description: data.Description,
        Hyperlink: data.Hyperlink,
        AltText: data.AltText,
        Picture: data.Picture?.[0],
      };

      await create(payload);
      toast.success(t("Articles.AddedSuccessfully"));
      reset();
      setImagePreview("");
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
                {...register("Title", { required: true })}
                placeholder={t("Articles.TitlePlaceholder")}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent ${
                  errors.Title ? "border-red-400" : "border-gray-200"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.Title && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {isRTL ? "هذا الحقل مطلوب" : "This field is required"}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Description")} <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("Description", { required: true })}
                rows={6}
                placeholder={t("Articles.DescriptionPlaceholder")}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent resize-none ${
                  errors.Description ? "border-red-400" : "border-gray-200"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.Description && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {isRTL ? "هذا الحقل مطلوب" : "This field is required"}
                </p>
              )}
            </div>

            {/* Hyperlink Field */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Hyperlink")} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("Hyperlink", { 
                  required: true,
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: isRTL ? "الرجاء إدخال رابط صحيح" : "Please enter a valid URL"
                  }
                })}
                placeholder={isRTL ? "https://example.com" : "https://example.com"}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent ${
                  errors.Hyperlink ? "border-red-400" : "border-gray-200"
                }`}
                dir="ltr"
              />
              {errors.Hyperlink && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {errors.Hyperlink.message || (isRTL ? "هذا الحقل مطلوب" : "This field is required")}
                </p>
              )}
            </div>

            {/* AltText Field */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.AltText")} <span className="text-red-500">*</span>
              </label>
              <input
                {...register("AltText", { required: true })}
                placeholder={t("Articles.AltTextPlaceholder")}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent ${
                  errors.AltText ? "border-red-400" : "border-gray-200"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              {errors.AltText && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {isRTL ? "هذا الحقل مطلوب" : "This field is required"}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {isRTL 
                  ? "وصف بديل للصورة (يظهر عند عدم تحميل الصورة)" 
                  : "Alternative text for the image (shown when image fails to load)"}
              </p>
            </div>

            {/* Picture Upload */}
            <div>
              <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold text-gray-700">
                {t("Articles.Picture")}
              </label>
              <div className="relative">
                <input
                  {...register("Picture")}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="picture-upload"
                />
                <label
                  htmlFor="picture-upload"
                  className="flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 hover:border-[#006F3C] transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">
                    {pictureFile && pictureFile.length > 0
                      ? pictureFile[0].name
                      : (isRTL ? "اختر صورة" : "Choose an image")}
                  </span>
                </label>
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg sm:rounded-xl border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      reset({ ...watch(), Picture: undefined });
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
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