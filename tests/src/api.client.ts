import { ApiException } from './api.exception';
import { Logger } from './logging';
import { AxiosRequestConfig } from 'axios';

const axios = require('axios');
export const BASE_API_URL = 'http://localhost:3000/';

export class ApiClient {

  private token: string | null = null;
  userId: string | null = null;

  withToken(token: string): ApiClient {
    let client = new ApiClient();
    client.token = token;
    return client;
  }

  async loadUserId() {
    let data = await this.get('users/me');
   this. userId = data.id;
  }

  private async execute(
    requestData: {
      path: string,
      body?: any
    },
    method: (url: string, body?: any, config?: AxiosRequestConfig) => any,
  ) {
    Logger.println();
    let url = BASE_API_URL + requestData.path;
    Logger.logBold('POST ' + url);
    if (requestData.body != null) {
      Logger.log('REQUEST BODY');
      Logger.logData(JSON.stringify(requestData.body, null, 2));
    }
    let config: AxiosRequestConfig = {};
    if (this.token != null) {
      config.headers = {
        authorization: 'Token: ' + this.token,
      };
    }
    try {
      let response = await method(url, requestData.body, config);
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

  async get(path: string, query?: any): Promise<any> {
    let pathWithQuery = path;
    if (query != null) {
      let queryString = Object.keys(query).map(it => it + '=' + query[it]).join('&');
      if (queryString.length > 0) {
        pathWithQuery = path + '?' + queryString;
      }
    }
    return this.execute({ path: pathWithQuery }, async (url, data, config) => {
      return axios.get(url, config);
    });
  }

  async post(path: string, body?: any): Promise<any> {
    return this.execute({ path, body }, async (url, data, config) => {
      return axios.post(url, data, config);
    });
  }

}

export const BaseClient: ApiClient = new ApiClient();
