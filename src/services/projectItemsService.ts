// src/services/projectItemsService.ts
import axiosClient from "../lib/axiosClient";
import type { ProjectItem, CreateProjectItemPayload } from "../types/projectItem";

export const getProjectItems = async (): Promise<ProjectItem[]> => {
  const { data } = await axiosClient.get<ProjectItem[]>("/ProjectItems");
  return data;
};

export const getProjectItem = async (id: string): Promise<ProjectItem> => {
  const { data } = await axiosClient.get<ProjectItem>(`/ProjectItems/${id}`);
  return data;
};

export const createProjectItem = async (
  payload: CreateProjectItemPayload
): Promise<void> => {
  const fd = new FormData();
  fd.append("Name", payload.Name);
  fd.append("Description", payload.Description);
  if (payload.DemoLink) fd.append("DemoLink", payload.DemoLink);
  fd.append("Price", String(payload.Price));
  if (payload.Picture) fd.append("Picture", payload.Picture);

  // لا تضف هيدر Content-Type يدوياً — اترك المتصفح/axios يضبطه مع boundary
  await axiosClient.post("/ProjectItems", fd);
};

export const updateProjectItem = async (
  id: string,
  payload: CreateProjectItemPayload
): Promise<void> => {
  const fd = new FormData();
  fd.append("Name", payload.Name);
  fd.append("Description", payload.Description);
  if (payload.DemoLink) fd.append("DemoLink", payload.DemoLink);
  fd.append("Price", String(payload.Price));
  if (payload.Picture) fd.append("Picture", payload.Picture);

  await axiosClient.put(`/ProjectItems/${id}`, fd);
};

export const deleteProjectItem = async (id: string): Promise<void> => {
  await axiosClient.delete(`/ProjectItems/${id}`);
};
