import type { ApiResponse } from '../model/ApiResponse';
import { ApiError } from '../error/ApiError';

export class NetworkService {
  private static instance: NetworkService;
  private baseUrl: string = '';

  private constructor() {}

  static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  async get<T>(url: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      let fullUrl = this.baseUrl + url;
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        fullUrl += '?' + queryString;
      }
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Network request failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(-1, 'Network error');
    }
  }

  async post<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.baseUrl + url;
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Network request failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(-1, 'Network error');
    }
  }

  async put<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.baseUrl + url;
      
      const response = await fetch(fullUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Network request failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(-1, 'Network error');
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.baseUrl + url;
      
      const response = await fetch(fullUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new ApiError(response.status, 'Network request failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(-1, 'Network error');
    }
  }
}