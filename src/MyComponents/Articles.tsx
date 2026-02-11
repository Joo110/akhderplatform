// src/components/Articles.tsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* eslint-disable @typescript-eslint/no-explicit-any */

type ArticleItem = {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  lang?: string;
  createdAt?: any;
};

const Articles: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as ArticleItem[];
      setArticles(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const filtered = articles.filter(a => a.lang === i18n.language);
  const others = articles.filter(a => a.lang !== i18n.language);
  const isRTL = i18n.language === "ar";

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
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-7 md:mb-8">
          <div className="w-1 h-8 sm:h-9 md:h-10 bg-gradient-to-b from-[#006F3C] to-[#FFC107] rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            {t("Articles.ListTitle")}
          </h2>
          <span className="ml-1 sm:ml-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-[#006F3C] text-white rounded-full text-xs sm:text-sm font-semibold">
            {articles.length}
          </span>
        </div>

        {/* Empty State */}
        {(filtered.length === 0 && others.length === 0) && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="inline-block p-6 sm:p-7 md:p-8 bg-gray-50 rounded-2xl">
              <svg className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-base sm:text-lg font-medium">{t("Articles.NoArticles")}</p>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...filtered, ...others].map((article) => {
            const isCurrentLang = article.lang === i18n.language;
            
            return (
              <article 
                key={article.id} 
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#006F3C]"
              >
                {/* Language Badge */}
                {!isCurrentLang && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {article.lang === "ar" ? "العربية" : "English"}
                    </span>
                  </div>
                )}

                {/* Color Accent */}
                <div className="h-1.5 sm:h-2 bg-gradient-to-r from-[#006F3C] to-[#FFC107]"></div>

                <div className="p-4 sm:p-5 md:p-6">
                  {/* Title */}
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#006F3C] transition-colors" 
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <Link to={`/articles/${article.id}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p 
                    className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed" 
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {article.excerpt || (article.content || "").slice(0, 140)}...
                  </p>

                  {/* Read More Link */}
                  <Link 
                    to={`/articles/${article.id}`} 
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-[#006F3C] font-semibold hover:gap-2 sm:hover:gap-3 transition-all group-hover:underline"
                  >
                    {t("Articles.ReadMore")}
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#006F3C]/0 to-[#FFC107]/0 group-hover:from-[#006F3C]/5 group-hover:to-[#FFC107]/5 transition-all duration-300 pointer-events-none rounded-xl sm:rounded-2xl"></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Articles;