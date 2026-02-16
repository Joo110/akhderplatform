// src/pages/ProjectItems.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjectItems } from "../hooks/useProjectItems";
import { getImageUrl, getPlaceholderImage } from "../utils/imageUtils";
import type { ProjectItem } from "../types/projectItem";
import { ExternalLink, Trash2, Plus, DollarSign, Eye } from "lucide-react";
import { useAuthContext } from "../context/AuthProvider";

const ProjectItems: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { projectItems, loading, remove } = useProjectItems();
  const { isAuthenticated } = useAuthContext();
  const [filter, setFilter] = useState<"all" | "withDemo" | "noDemo">("all");

  const isRTL = i18n.language === "ar";

  const handleDelete = async (id: string, name: string) => {
    const confirmMessage = isRTL 
      ? `هل أنت متأكد من حذف المشروع "${name}"؟`
      : `Are you sure you want to delete "${name}"?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await remove(id);
      } catch (error) {
        console.error("Error deleting project:", error);
        alert(isRTL ? "حدث خطأ أثناء حذف المشروع" : "Error deleting project");
      }
    }
  };

  // Filter projects
  const filteredProjects = projectItems.filter((item) => {
    if (filter === "withDemo") return !!item.demoLink;
    if (filter === "noDemo") return !item.demoLink;
    return true;
  });

  // Sort by date (newest first)
  const sortedProjects = [...filteredProjects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative">
            <svg className="animate-spin h-16 w-16 text-[#006F3C] mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg font-medium">{t("Projects.Loading")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-12 bg-gradient-to-b from-[#006F3C] to-[#FFC107] rounded-full"></div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  {t("Projects.Title")}
                </h1>
              </div>
              <p className="text-gray-600 text-base sm:text-lg ml-5" dir={isRTL ? "rtl" : "ltr"}>
                {t("Projects.Subtitle")}
              </p>
            </div>

            {/* Add Project Button - يظهر فقط لو مسجل دخول */}
            {isAuthenticated && (
              <Link
                to="/AddProjectItem"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#006F3C] to-[#00934D] hover:from-[#005A31] hover:to-[#007A40] text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                {t("Projects.AddNew")}
              </Link>
            )}
          </div>

          {/* Stats & Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#006F3C] rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {t("Projects.Total")}: <span className="font-bold text-gray-900">{projectItems.length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFC107] rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {t("Projects.WithDemo")}: <span className="font-bold text-gray-900">{projectItems.filter(p => p.demoLink).length}</span>
                </span>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "all"
                    ? "bg-[#006F3C] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("Projects.All")}
              </button>
              <button
                onClick={() => setFilter("withDemo")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "withDemo"
                    ? "bg-[#006F3C] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("Projects.WithDemoOnly")}
              </button>
              <button
                onClick={() => setFilter("noDemo")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === "noDemo"
                    ? "bg-[#006F3C] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("Projects.NoDemoOnly")}
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-lg">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#006F3C]/20 to-[#FFC107]/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium mb-6">
                {filter === "all" ? t("Projects.NoProjects") : t("Projects.NoFilteredProjects")}
              </p>
              {filter === "all" && isAuthenticated && (
                <Link
                  to="/AddProjectItem"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#006F3C] text-white rounded-xl font-semibold hover:bg-[#005A31] transition-all shadow-md"
                >
                  <Plus className="w-5 h-5" />
                  {t("Projects.AddFirst")}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {sortedProjects.length > 0 && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project: ProjectItem) => {
              const imageUrl = getImageUrl(project.pictureUrl);
              
              return (
                <article 
                  key={project.id} 
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#006F3C]"
                >
                  {/* Gradient Accent */}
                  <div className="h-2 bg-gradient-to-r from-[#006F3C] to-[#FFC107]"></div>

                  {/* Project Image */}
                  {imageUrl ? (
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={project.name}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.onerror = null;
                          target.src = getPlaceholderImage();
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-[#006F3C]" />
                          <span className="font-bold text-gray-900">{project.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Demo Badge */}
                      {project.demoLink && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FFC107] rounded-full shadow-lg">
                          <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                            {t("Projects.HasDemo")}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {/* Price Badge for no-image */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-white rounded-full shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-[#006F3C]" />
                          <span className="font-bold text-gray-900">${project.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Project Name */}
                    <h3 
                      className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-[#006F3C] transition-colors"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <Link to={`/projects/${project.id}`} className="hover:underline">
                        {project.name}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {project.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
                      {/* View Details */}
                      <Link 
                        to={`/Projectitemdetails/${project.id}`} 
                        className="inline-flex items-center gap-2 text-[#006F3C] font-semibold text-sm hover:gap-3 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        {t("Projects.ViewDetails")}
                      </Link>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {/* Demo Link */}
                        {project.demoLink && (
                          <a
                            href={project.demoLink.startsWith('http') ? project.demoLink : `https://${project.demoLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#FFC107] hover:bg-yellow-50 rounded-lg transition-all"
                            title={t("Projects.ViewDemo")}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                       

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(project.id, project.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title={t("Projects.Delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#006F3C]/0 to-[#FFC107]/0 group-hover:from-[#006F3C]/5 group-hover:to-[#FFC107]/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectItems;
