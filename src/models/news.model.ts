export interface INews {
  source?: any;
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}

export const defaultValue: Readonly<INews> = {};
