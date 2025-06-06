import { Post, Tag } from "@prisma/client";
import { Comment } from "@prisma/client";

export type PostStatus = "popular" | "recent";

export interface ThumbnailPostData {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
}

export type PostWithId = {
  id: number;
  title: string;
  content: string;
  views: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};

export interface InfinitePostArr {
  nextCursor?: string;
  data: PostWithId[];
}

export type PostsIds = [{ id: number }];

export interface IPost {
  title: string;
  content: string;
  views: number;
  tags: { tagId: number; tag: string }[];
  description: string;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
  comments: (Comment | null)[];
}

export interface EditPost extends Omit<Post, "tags" | "comments" | "createdAt" | "updatedAt" | "views" | "content"> {
  id: number;
  markdown: string;
  tags: string[];
  category?: { category: string };
}
