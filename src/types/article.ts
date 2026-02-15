export interface Article {
  id: string;
  title: string;
  description: string;
  hyperlink: string;
  altText: string;
  pictureUrl?: string;
}

export interface CreateArticlePayload {
  Title: string;
  Description: string;
  Hyperlink: string;
  AltText: string;
  Picture?: File;
}
