export interface PostPostJson {
  title: string;
  markdown: string | undefined;
  tags?: string[];
  description: string;
  category: string[] | null;
}

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  description: string;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: { tagId: number; tag: string }[];
}

export interface PostListResponse {
  nextCursor?: string;
  data: PostResponse[];
}
