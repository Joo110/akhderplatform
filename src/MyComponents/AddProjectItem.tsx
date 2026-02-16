// src/pages/AddProjectItem.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useProjectItems } from "../hooks/useProjectItems";
import type { CreateProjectItemPayload } from "../types/projectItem";
import { 
  ArrowLeft, 
  Upload, 
  DollarSign, 
  FileText, 
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  X
} from "lucide-react";

type FormValues = {
  Name: string;
  Description: string;
  DemoLink?: string;
  Price: number;
  Picture?: FileList;
};

const AddProjectItem: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { create } = useProjectItems();
  const [imagePreview, setImagePreview] = useState<string>("");
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting },
    watch 
  } = useForm<FormValues>();

  const pictureFile = watch("Picture");
  const isRTL = i18n.language === "ar";

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
      const payload: CreateProjectItemPayload = {
        Name: data.Name,
        Description: data.Description,
        DemoLink: data.DemoLink || undefined,
        Price: Number(data.Price),
        Picture: data.Picture?.[0] || null,
      };

      await create(payload);
      toast.success(t("Projects.AddedSuccessfully"));
      navigate("/projects");
    } catch (err) {
      console.error(err);
      toast.error(t("Projects.AddError"));
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-[#006F3C] hover:text-[#005A31] font-semibold mb-4 group transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {isRTL ? "العودة للمشاريع" : "Back to Projects"}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-12 bg-gradient-to-b from-[#006F3C] to-[#FFC107] rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {t("Projects.AddNew")}
              </h1>
              <p className="text-gray-600 mt-1">
                {t("Projects.AddSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          {/* Gradient Accent */}
          <div className="h-2 bg-gradient-to-r from-[#006F3C] to-[#FFC107]"></div>

          <div className="p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                  <FileText className="w-4 h-4 text-[#006F3C]" />
                  {t("Projects.Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("Name", { 
                    required: t("Projects.NameRequired"),
                    minLength: {
                      value: 3,
                      message: isRTL ? "الاسم يجب أن يكون 3 أحرف على الأقل" : "Name must be at least 3 characters"
                    }
                  })}
                  placeholder={t("Projects.NamePlaceholder")}
                  className={`w-full px-4 py-3.5 text-base rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent ${
                    errors.Name ? "border-red-400" : "border-gray-200"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.Name && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                    <X className="w-4 h-4" />
                    {errors.Name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                  <FileText className="w-4 h-4 text-[#006F3C]" />
                  {t("Projects.Description")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("Description", { 
                    required: t("Projects.DescriptionRequired"),
                    minLength: {
                      value: 10,
                      message: isRTL ? "الوصف يجب أن يكون 10 أحرف على الأقل" : "Description must be at least 10 characters"
                    }
                  })}
                  rows={6}
                  placeholder={t("Projects.DescriptionPlaceholder")}
                  className={`w-full px-4 py-3.5 text-base rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent resize-none ${
                    errors.Description ? "border-red-400" : "border-gray-200"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.Description && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                    <X className="w-4 h-4" />
                    {errors.Description.message}
                  </p>
                )}
              </div>

              {/* Price & Demo Link Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                    <DollarSign className="w-4 h-4 text-[#006F3C]" />
                    {t("Projects.Price")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                      $
                    </span>
                    <input
                      {...register("Price", { 
                        required: t("Projects.PriceRequired"),
                        min: {
                          value: 0,
                          message: isRTL ? "السعر يجب أن يكون 0 أو أكثر" : "Price must be 0 or more"
                        },
                        valueAsNumber: true
                      })}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={t("Projects.PricePlaceholder")}
                      className={`w-full pl-10 pr-4 py-3.5 text-base rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#006F3C] focus:border-transparent ${
                        errors.Price ? "border-red-400" : "border-gray-200"
                      }`}
                      dir="ltr"
                    />
                  </div>
                  {errors.Price && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                      <X className="w-4 h-4" />
                      {errors.Price.message}
                    </p>
                  )}
                </div>

                {/* Demo Link */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                    <LinkIcon className="w-4 h-4 text-[#FFC107]" />
                    {t("Projects.DemoLink")}
                    <span className="text-xs font-normal text-gray-500">({t("Projects.Optional")})</span>
                  </label>
                  <input
                    {...register("DemoLink", {
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: isRTL ? "الرجاء إدخال رابط صحيح" : "Please enter a valid URL"
                      }
                    })}
                    placeholder={t("Projects.DemoLinkPlaceholder")}
                    className={`w-full px-4 py-3.5 text-base rounded-xl bg-gray-50 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent ${
                      errors.DemoLink ? "border-red-400" : "border-gray-200"
                    }`}
                    dir="ltr"
                  />
                  {errors.DemoLink && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                      <X className="w-4 h-4" />
                      {errors.DemoLink.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Picture Upload */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm font-bold text-gray-700">
                  <ImageIcon className="w-4 h-4 text-[#006F3C]" />
                  {t("Projects.Picture")}
                  <span className="text-xs font-normal text-gray-500">({t("Projects.Optional")})</span>
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
                    className="flex flex-col items-center justify-center gap-3 w-full px-6 py-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 hover:border-[#006F3C] transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#006F3C] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-gray-700 mb-1">
                        {pictureFile && pictureFile.length > 0
                          ? pictureFile[0].name
                          : (isRTL ? "اختر صورة للمشروع" : "Choose project image")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isRTL ? "PNG, JPG أو WEBP (الحد الأقصى 5MB)" : "PNG, JPG or WEBP (Max 5MB)"}
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4 relative">
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => {
                          reset({ ...watch(), Picture: undefined });
                          setImagePreview("");
                        }}
                        className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Success Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-green-500 rounded-full shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-white" />
                          <span className="text-xs font-bold text-white">
                            {isRTL ? "جاهز" : "Ready"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <p className="font-semibold mb-1">{t("Projects.ProTip")}</p>
                    <p>{t("Projects.ProTipDescription")}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#006F3C] to-[#00934D] hover:from-[#005A31] hover:to-[#007A40] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t("Projects.Saving")}
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      {t("Projects.AddButton")}
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-lg transition-all disabled:opacity-50"
                >
                  {t("Projects.Cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t("Projects.HelpTitle1")}</h3>
            <p className="text-xs text-gray-600">{t("Projects.HelpDesc1")}</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <ImageIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t("Projects.HelpTitle2")}</h3>
            <p className="text-xs text-gray-600">{t("Projects.HelpDesc2")}</p>
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <LinkIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{t("Projects.HelpTitle3")}</h3>
            <p className="text-xs text-gray-600">{t("Projects.HelpDesc3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProjectItem;