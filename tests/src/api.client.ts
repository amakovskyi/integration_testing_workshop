import { ApiException } from './api.exception';
import { Logger } from './logging';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/';

export class ApiClient {

  private async execute(
    requestData: {
      path: string,
      body?: any
    },
    method: (url: string, body?: any) => any,
  ) {
    Logger.println();
    let url = baseUrl + requestData.path;
    Logger.logBold('POST ' + url);
    if (requestData.body != null) {
      Logger.log('REQUEST BODY');
      Logger.logData(JSON.stringify(requestData.body, null, 2));
    }
    try {
      let response = await method(url, requestData.body);
      Logger.log('RESPONSE: ' + response.status + ' ' + response.statusText);
      if (response.data != null && response.data != '') {
        Logger.log('RESPONSE BODY');
        Logger.logData(JSON.stringify(response.data, null, 2));
      } else {
        Logger.log('RESPONSE BODY EMPTY');
      }
      return response.data;
    } catch (e: any) {
      if (e.name == 'AxiosError') {
        Logger.logError('RESPONSE: ' + e.response.status + ' ' + e.response.data.message);
        throw new ApiException(e.response.data);
      }
      console.log(e);
      throw e;
    } finally {
      Logger.println();
    }
  }

  async get(path: string): Promise<any> {
    return this.execute({ path }, axios.get);
  }

  async post(path: string, body?: any): Promise<any> {
    return this.execute({ path, body }, axios.post);
  }

}

export const BaseClient: ApiClient = new ApiClient();
