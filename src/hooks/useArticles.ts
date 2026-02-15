import { useEffect, useState } from "react";
import {
  getArticles,
  createArticle,
  deleteArticle,
} from "../services/articlesService";
import type { Article, CreateArticlePayload } from "../types/article";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: CreateArticlePayload) => {
    await createArticle(payload);
    await fetchArticles();
  };

  const remove = async (id: string) => {
    await deleteArticle(id);
    await fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, create, remove };
};
