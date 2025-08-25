import { API_CONFIG, HTTP_STATUS, API_ERROR_MESSAGES } from './config';
import type { APIResponse, APIError } from '@/types/api';

// 401 에러 발생 시 로그아웃 처리를 위한 콜백 함수 타입
export type UnauthorizedCallback = () => void;

// HTTP 클라이언트 클래스
class HTTPClient {
  private baseURL: string;
  private timeout: number;
  private onUnauthorized: UnauthorizedCallback | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // 401 에러 콜백 설정
  setUnauthorizedCallback(callback: UnauthorizedCallback) {
    this.onUnauthorized = callback;
  }

  // 기본 헤더 설정
  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // 인증 토큰이 있으면 헤더에 추가
    if (token) {
      headers['authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // 타임아웃 처리를 위한 AbortController
  private createAbortController(): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), this.timeout);
    return controller;
  }

  // 에러 처리
  private handleError(error: any): APIError {
    if (error.name === 'AbortError') {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: API_ERROR_MESSAGES.TIMEOUT_ERROR,
      };
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: API_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    return {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: API_ERROR_MESSAGES.UNKNOWN_ERROR,
      details: error,
    };
  }

  // HTTP 요청 메서드
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const controller = this.createAbortController();

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(token),
          ...options.headers,
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        // 401 Unauthorized 에러 처리
        if (response.status === HTTP_STATUS.UNAUTHORIZED) {
          console.log('401 Unauthorized 에러 발생, 로그아웃 처리');
          if (this.onUnauthorized) {
            this.onUnauthorized();
          }
          return {
            success: false,
            error: {
              status: HTTP_STATUS.UNAUTHORIZED,
              message: API_ERROR_MESSAGES.UNAUTHORIZED,
            },
          };
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      // 응답이 성공적일 때 JSON 파싱 시도
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.warn('JSON 파싱 실패:', jsonError);
        // JSON 파싱에 실패해도 빈 객체로 처리
        data = {};
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      const apiError = this.handleError(error);
      return {
        success: false,
        error: apiError,
      };
    }
  }

  // GET 요청
  async get<T>(endpoint: string, token?: string): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, token);
  }

  // POST 요청
  async post<T>(
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    );
  }

  // PUT 요청
  async put<T>(
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    );
  }

  // DELETE 요청
  async delete<T>(endpoint: string, token?: string): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, token);
  }

  // PATCH 요청
  async patch<T>(
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<APIResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      },
      token
    );
  }
}

// 싱글톤 인스턴스 생성
export const httpClient = new HTTPClient();
