// src/types/projectItem.ts
export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  demoLink?: string;
  price: number;
  pictureUrl?: string;
  createdAt: string;
};

export type CreateProjectItemPayload = {
  Name: string;
  Description: string;
  DemoLink?: string;
  Price: number;
  Picture?: File | null;
};
