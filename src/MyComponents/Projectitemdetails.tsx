// src/pages/ProjectItemDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjectItem } from "../services/projectItemsService";
import { getImageUrl, getPlaceholderImage } from "../utils/imageUtils";
import type { ProjectItem } from "../types/projectItem";
import { 
  ArrowLeft, 
  ExternalLink, 
  DollarSign, 
  Calendar, 
  Edit, 
  Share2,
  Download
} from "lucide-react";

const ProjectItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getProjectItem(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);

  const isRTL = i18n.language === "ar";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isRTL ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  const handleShare = async () => {
    const shareData = {
      title: project?.name || "",
      text: project?.description || "",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isRTL ? "تم نسخ الرابط!" : "Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative mb-4">
            <svg className="animate-spin h-16 w-16 text-[#006F3C] mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg font-medium">{t("Projects.Loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md">
          <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl mb-6 shadow-lg">
            <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "المشروع غير موجود" : "Project Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isRTL ? "عذراً، لم نتمكن من العثور على هذا المشروع" : "Sorry, we couldn't find this project"}
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#006F3C] text-white rounded-xl font-semibold hover:bg-[#005A31] transition-all shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            {isRTL ? "العودة للمشاريع" : "Back to Projects"}
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(project.pictureUrl);

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="inline-flex items-center gap-2 text-[#006F3C] hover:text-[#005A31] font-semibold mb-6 group transition-all"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {isRTL ? "العودة للمشاريع" : "Back to Projects"}
        </button>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Gradient */}
          <div className="h-2 bg-gradient-to-r from-[#006F3C] to-[#FFC107]"></div>

          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12">
            {/* Left Column - Image & Quick Info */}
            <div className="space-y-6">
              {/* Project Image */}
              {imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <img
                    src={imageUrl}
                    alt={project.name}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = getPlaceholderImage();
                    }}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-xl">
                  <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              )}

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Price Card */}
                <div className="p-4 bg-gradient-to-br from-[#006F3C]/5 to-[#006F3C]/10 rounded-xl border-2 border-[#006F3C]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-[#006F3C]" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {t("Projects.Price")}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#006F3C]">
                    ${project.price.toLocaleString()}
                  </p>
                </div>

                {/* Date Card */}
                <div className="p-4 bg-gradient-to-br from-[#FFC107]/5 to-[#FFC107]/10 rounded-xl border-2 border-[#FFC107]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#FFC107]" />
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {t("Projects.Created")}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    {formatDate(project.createdAt)}
                  </p>
                </div>
              </div>

              {/* Demo Link Card */}
              {project.demoLink && (
                <a
                  href={project.demoLink.startsWith('http') ? project.demoLink : `https://${project.demoLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t("Projects.ViewDemo")}</p>
                      <p className="text-xs text-gray-600 line-clamp-1">{project.demoLink}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {project.name}
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-[#006F3C] to-[#FFC107] rounded-full"></div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t("Projects.Description")}
                </h2>
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap p-6 bg-gray-50 rounded-xl border border-gray-100"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {project.description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                {/* Edit Button */}
                <Link
                  to={`/projects/edit/${project.id}`}
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  <Edit className="w-5 h-5" />
                  {t("Projects.EditProject")}
                </Link>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  {t("Projects.Share")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Info Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-[#006F3C] to-[#00934D] rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t("Projects.Pricing")}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("Projects.PricingDescription")}
            </p>
          </div>

          {/* Info Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-xl flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t("Projects.Delivery")}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("Projects.DeliveryDescription")}
            </p>
          </div>

          {/* Info Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t("Projects.Support")}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("Projects.SupportDescription")}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectItemDetails;