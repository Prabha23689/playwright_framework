import { APIRequestContext, request } from '@playwright/test';

export class NetworkUtil {
  static async createRequestContext(baseURL: string): Promise<APIRequestContext> {
    return await request.newContext({ baseURL });
  }
}
