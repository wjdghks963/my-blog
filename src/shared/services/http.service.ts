class HttpService {
  private static instance: HttpService;
  private readonly baseURL: string;

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      // 에러 바디를 JSON으로 파싱 시도하여 메시지 노출 개선
      try {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorBody = await response.json();
          const message = (errorBody && (errorBody.error || errorBody.message)) || `HTTP error ${response.status}`;
          throw new Error(message);
        }
      } catch (_) {
        // noop: JSON parse 실패 시 아래로 fallthrough
      }
      throw new Error(`HTTP error ${response.status}`);
    }

    // 204 No Content 등 본문이 없는 경우
    if (response.status === 204) {
      return undefined as unknown as T;
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as T;
    }

    // JSON 이외의 응답은 텍스트로 반환
    const text = await response.text();
    return text as unknown as T;
  }

  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(url: string, data?: unknown, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(url: string, data?: unknown, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "DELETE",
    });
  }
}

export const httpService = HttpService.getInstance();
