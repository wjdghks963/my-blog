import { Tag } from "@prisma/client";

import { Comment } from "./app/api/blogs/[id]/route";

export type PostStatus = "popular" | "recent";

type MutationResult = { ok: boolean };

export interface ThumbnailPostData {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  views?: number;
}

export type Category = {
  category: string;
  posts: { id: number; title: string }[];
};

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

export interface UserInfo {
  email: string;
  name: string;
  image: string;
}

export interface CommentPostJson {
  postId: string;
  userEmail: string;
  content: string;
}

export interface CommentEditJson {
  commentId: string;
  content: string;
}

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

export type CommentWithUser = { id: number; content: string; user: UserInfo };

export interface EditPost extends Omit<Post, "tags" | "comments" | "createdAt" | "updatedAt" | "views" | "content"> {
  id: number;
  markdown: string;
  tags: string[];
  category?: string[];
}

export interface PostPostJson {
  title: string;
  markdown: string | undefined;
  tags?: string[];
  description: string;
  category: string[] | null;
}
