import axiosClient from "../lib/axiosClient";
import type { Article, CreateArticlePayload } from "../types/article";

export const getArticles = async (): Promise<Article[]> => {
  const { data } = await axiosClient.get<Article[]>("/Articles");
  return data;
};

export const getArticle = async (id: string): Promise<Article> => {
  const { data } = await axiosClient.get<Article>(`/Articles/${id}`);
  return data;
};

export const createArticle = async (
  payload: CreateArticlePayload
): Promise<void> => {
  const fd = new FormData();
  fd.append("Title", payload.Title);
  fd.append("Description", payload.Description);
  fd.append("Hyperlink", payload.Hyperlink);
  fd.append("AltText", payload.AltText);
  if (payload.Picture) fd.append("Picture", payload.Picture);

  await axiosClient.post("/Articles", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateArticle = async (
  id: string,
  payload: CreateArticlePayload
): Promise<void> => {
  const fd = new FormData();
  fd.append("Title", payload.Title);
  fd.append("Description", payload.Description);
  fd.append("Hyperlink", payload.Hyperlink);
  fd.append("AltText", payload.AltText);
  if (payload.Picture) fd.append("Picture", payload.Picture);

  await axiosClient.put(`/Articles/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteArticle = async (id: string): Promise<void> => {
  await axiosClient.delete(`/Articles/${id}`);
};
