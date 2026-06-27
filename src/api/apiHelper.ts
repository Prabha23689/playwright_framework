import { APIRequestContext, request } from '@playwright/test';

export class ApiHelper {
  private readonly apiContext: APIRequestContext;

  private constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  static async create(baseURL: string): Promise<ApiHelper> {
    const apiContext = await request.newContext({ baseURL });
    return new ApiHelper(apiContext);
  }

  async get(endpoint: string): Promise<any> {
    const response = await this.apiContext.get(endpoint);
    return response;
  }

  async post(endpoint: string, body: object): Promise<any> {
    const response = await this.apiContext.post(endpoint, { data: body });
    return response;
  }
}
