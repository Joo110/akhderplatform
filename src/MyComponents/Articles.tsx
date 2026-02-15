// src/components/Articles.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useArticles } from "../hooks/useArticles";
import type { Article } from "../types/article";
import { useAuthContext } from "../context/AuthProvider";

const API_BASE = "https://localhost:7114"; // URL الـ API


// مسار صورة بدل الاحتياط (ضع placeholder في public/images/placeholder.png)
const FALLBACK_SRC = `${window.location.origin}/images/placeholder.png`;

const Articles: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { articles, loading, remove } = useArticles();
  const { isAuthenticated } = useAuthContext();

  const isRTL = i18n.language === "ar";

  const handleDelete = async (id: string, title: string) => {
    const confirmMessage = isRTL
      ? `هل أنت متأكد من حذف المقال "${title}"؟`
      : `Are you sure you want to delete "${title}"?`;

    if (window.confirm(confirmMessage)) {
      try {
        await remove(id);
      } catch (error) {
        console.error("Error deleting article:", error);
        alert(isRTL ? "حدث خطأ أثناء حذف المقال" : "Error deleting article");
      }
    }
  };

  // helper لبناء URL كامل من pictureUrl اللي ال API بيرجعه
  const getFullImageUrl = (url?: string | null) => {
    if (!url) return "";
    // لو URL كامل بالفعل (http:// أو https:// أو //) رجعه كما هو
    if (/^(https?:)?\/\//i.test(url)) return url;
    // خلاف ذلك، أزل أي شرطة بداية وألصقها بعد الـ base
    return `${API_BASE}/${url.replace(/^\/+/, "")}`;
  };

  if (loading) {
    return (
      <section className="my-6 sm:my-8 md:my-12 w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
            <div className="text-center">
              <svg className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-[#006F3C] mx-auto mb-3 sm:mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-600 text-sm sm:text-base font-medium">{t("Articles.Loading")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-8 md:my-12 w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-7 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 h-8 sm:h-9 md:h-10 bg-gradient-to-b from-[#006F3C] to-[#FFC107] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              {t("Articles.ListTitle")}
            </h2>
            <span className="ml-1 sm:ml-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#006F3C] text-white rounded-full text-xs sm:text-sm font-semibold">
              {articles.length}
            </span>
          </div>

          {/* Add New Button - يظهر فقط لو المستخدم مسجّل دخول */}
          {isAuthenticated && (
            <Link
              to="/articles/add"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#006F3C] to-[#00934D] hover:from-[#005A31] hover:to-[#007A40] text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t("Articles.AddNew")}
            </Link>
          )}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="inline-block p-6 sm:p-7 md:p-8 bg-gray-50 rounded-2xl">
              <svg className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-base sm:text-lg font-medium mb-4">{t("Articles.NoArticles")}</p>

              {/* Add First - يظهر فقط لو مستخدم مسجّل دخول */}
              {isAuthenticated ? (
                <Link
                  to="/articles/add"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006F3C] text-white rounded-lg font-semibold hover:bg-[#005A31] transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t("Articles.AddFirst")}
                </Link>
              ) : (
                <p className="text-sm text-gray-400">
                  {t("Articles.LoginToAdd") || (isRTL ? "سجّل الدخول لإضافة مقال" : "Please login to add articles")}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length > 0 && (
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: Article) => {
              const fullImg = getFullImageUrl(article.pictureUrl);

              return (
                <article 
                  key={article.id} 
                  className="group relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#006F3C]"
                >
                  <div className="h-1.5 sm:h-2 bg-gradient-to-r from-[#006F3C] to-[#FFC107]"></div>

                  {article.pictureUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={fullImg}
                        alt={article.altText || article.title}
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (img.dataset.fallbackApplied === "1") return;
                          img.dataset.fallbackApplied = "1";
                          // @ts-ignore
                          img.onerror = null;
                          img.src = FALLBACK_SRC;
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  )}

                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 
                      className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#006F3C] transition-colors" 
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <Link to={`/articles/${article.id}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </h3>

                    <p 
                      className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed" 
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                      <Link 
                        to={`/articles/${article.id}`} 
                        className="inline-flex items-center gap-1.5 text-sm sm:text-base text-[#006F3C] font-semibold hover:gap-2 transition-all group-hover:underline"
                      >
                        {t("Articles.ReadMore")}
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                        </svg>
                      </Link>

                      <div className="flex items-center gap-2">
                      
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title={isRTL ? "حذف" : "Delete"}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#006F3C]/0 to-[#FFC107]/0 group-hover:from-[#006F3C]/5 group-hover:to-[#FFC107]/5 transition-all duration-300 pointer-events-none rounded-xl sm:rounded-2xl"></div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;
