export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface DocumentMeta {
  title: string;
  description?: string;
  rawUrl: string;
  path: string;
}
