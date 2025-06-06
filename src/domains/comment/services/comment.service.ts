import { CommentPostJson, CommentEditJson, CommentResponse } from "@domains/comment/types";
import { httpService } from "@shared/services/http.service";

export class CommentService {
  private static instance: CommentService;
  private readonly BASE_URL = "/api/comments";

  private constructor() {}

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  async getComments(postId: number): Promise<CommentResponse[]> {
    return httpService.get<CommentResponse[]>(`${this.BASE_URL}/post/${postId}`);
  }

  async createComment(commentData: CommentPostJson): Promise<CommentResponse> {
    return httpService.post<CommentResponse>(this.BASE_URL, commentData);
  }

  async updateComment(commentData: CommentEditJson): Promise<CommentResponse> {
    return httpService.put<CommentResponse>(`${this.BASE_URL}/${commentData.commentId}`, commentData);
  }

  async deleteComment(commentId: number): Promise<void> {
    return httpService.delete(`${this.BASE_URL}/${commentId}`);
  }

  async getCommentCount(postId: number): Promise<number> {
    const response = await httpService.get<{ count: number }>(`${this.BASE_URL}/post/${postId}/count`);
    return response.count;
  }

  async getRecentComments(limit: number = 5): Promise<CommentResponse[]> {
    return httpService.get<CommentResponse[]>(`${this.BASE_URL}/recent?limit=${limit}`);
  }
}
