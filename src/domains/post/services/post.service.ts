import { PostPostJson, PostResponse, PostListResponse } from "@domains/post/types";
import { httpService } from "@shared/services/http.service";

export class PostService {
  private static instance: PostService;
  private readonly BASE_URL = "/api/posts";

  private constructor() {}

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  async getPosts(cursor?: string): Promise<PostListResponse> {
    const url = cursor ? `${this.BASE_URL}?cursor=${cursor}` : this.BASE_URL;
    return httpService.get<PostListResponse>(url);
  }

  async getPost(id: number): Promise<PostResponse> {
    return httpService.get<PostResponse>(`${this.BASE_URL}/${id}`);
  }

  async createPost(postData: PostPostJson): Promise<PostResponse> {
    return httpService.post<PostResponse>(this.BASE_URL, postData);
  }

  async updatePost(id: number, postData: PostPostJson): Promise<PostResponse> {
    return httpService.put<PostResponse>(`${this.BASE_URL}/${id}`, postData);
  }

  async deletePost(id: number): Promise<void> {
    return httpService.delete(`${this.BASE_URL}/${id}`);
  }

  async getPostsByCategory(category: string, cursor?: string): Promise<PostListResponse> {
    const url = `${this.BASE_URL}/category/${category}${cursor ? `?cursor=${cursor}` : ""}`;
    return httpService.get<PostListResponse>(url);
  }

  async getPostsByTag(tag: string, cursor?: string): Promise<PostListResponse> {
    const url = `${this.BASE_URL}/tag/${tag}${cursor ? `?cursor=${cursor}` : ""}`;
    return httpService.get<PostListResponse>(url);
  }

  async searchPosts(query: string, cursor?: string): Promise<PostListResponse> {
    const url = `${this.BASE_URL}/search?q=${encodeURIComponent(query)}${cursor ? `&cursor=${cursor}` : ""}`;
    return httpService.get<PostListResponse>(url);
  }
}
