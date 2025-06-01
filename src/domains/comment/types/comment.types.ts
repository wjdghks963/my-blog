import { UserInfo } from "@shared/types/common.types";

export type CommentWithUser = {
  id: number;
  content: string;
  user: UserInfo;
};

export interface Comment {
  id: number;
  content: string;
  userEmail: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}
