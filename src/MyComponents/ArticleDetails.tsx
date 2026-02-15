// src/components/ArticleDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getArticle } from "../../src/services/articlesService";
import type { Article } from "../types/article";

const ArticleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getArticle(id);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);

  const isRTL = i18n.language === "ar";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 sm:h-16 sm:w-16 text-[#006F3C] mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600 text-base sm:text-lg font-medium">{t("Articles.Loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-block p-6 sm:p-8 bg-gray-50 rounded-2xl mb-4 sm:mb-6">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            {isRTL ? "المقال غير موجود" : "Article Not Found"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {isRTL ? "عذراً، لم نتمكن من العثور على هذا المقال" : "Sorry, we couldn't find this article"}
          </p>
          <button
            onClick={() => navigate("/articles")}
            className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#006F3C] text-white rounded-lg sm:rounded-xl font-semibold hover:bg-[#005A31] transition-all"
          >
            {isRTL ? "العودة للمقالات" : "Back to Articles"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/articles")}
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-[#006F3C] hover:text-[#005A31] font-semibold mb-4 sm:mb-6 md:mb-8 group transition-all"
        >
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
          </svg>
          {isRTL ? "العودة للمقالات" : "Back to Articles"}
        </button>

        {/* Article Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          {/* Header Accent */}
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-[#006F3C] to-[#FFC107]"></div>

          {/* Article Image */}
          {article.pictureUrl && (
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src={article.pictureUrl}
                alt={article.altText || article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Title Overlay on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  {article.title}
                </h1>
              </div>
            </div>
          )}

          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Title (if no image) */}
            {!article.pictureUrl && (
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {article.title}
              </h1>
            )}

            {/* Description */}
            <div 
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-6 sm:mb-8"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base md:text-lg">
                {article.description}
              </p>
            </div>

            {/* External Link */}
            {article.hyperlink && (
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-[#006F3C]/5 to-[#FFC107]/5 rounded-lg sm:rounded-xl border-l-4 border-[#006F3C]">
                <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#006F3C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-sm sm:text-base font-semibold text-gray-700">
                      {isRTL ? "رابط خارجي:" : "External Link:"}
                    </span>
                  </div>
                  <a
                    href={article.hyperlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-[#006F3C] hover:text-[#005A31] font-medium hover:underline break-all"
                  >
                    {article.hyperlink}
                  </a>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/articles/edit/${article.id}`}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {isRTL ? "تعديل المقال" : "Edit Article"}
              </Link>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-6 sm:mt-7 md:mt-8 p-4 sm:p-5 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md text-center">
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-3 sm:mb-4">
            {isRTL ? "شارك هذا المقال" : "Share this article"}
          </p>
          <div className="flex justify-center gap-3 sm:gap-4">
            <button 
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert(isRTL ? "تم نسخ الرابط" : "Link copied!");
              }}
              className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all group"
              title={isRTL ? "نسخ الرابط" : "Copy link"}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all group"
              title="Facebook"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all group"
              title="Twitter"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetails;