export interface CommentPostJson {
  postId: string;
  userEmail: string;
  content: string;
}

export interface CommentEditJson {
  commentId: string;
  content: string;
}

export interface CommentResponse {
  id: number;
  content: string;
  userEmail: string;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}
