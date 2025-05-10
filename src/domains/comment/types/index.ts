import { UserInfo } from "@/shared/types";

export interface CommentPostJson {
  postId: string;
  userEmail: string;
  content: string;
}

export interface CommentEditJson {
  commentId: string;
  content: string;
}

export type CommentWithUser = { 
  id: number; 
  content: string; 
  user: UserInfo 
}; 