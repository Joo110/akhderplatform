// src/hooks/useProjectItems.ts
import { useEffect, useState } from "react";
import {
  getProjectItems,
  createProjectItem,
  deleteProjectItem,
} from "../services/projectItemsService";
import type { ProjectItem, CreateProjectItemPayload } from "../types/projectItem";

export const useProjectItems = () => {
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjectItems = async () => {
    setLoading(true);
    try {
      const data = await getProjectItems();
      setProjectItems(data);
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload: CreateProjectItemPayload) => {
    await createProjectItem(payload);
    await fetchProjectItems();
  };

  const remove = async (id: string) => {
    await deleteProjectItem(id);
    await fetchProjectItems();
  };

  useEffect(() => {
    fetchProjectItems();
  }, []);

  return { projectItems, loading, create, remove };
};
