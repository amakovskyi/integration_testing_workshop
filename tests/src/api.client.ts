import { ApiException } from './api.exception';
import { Logger } from './logging';

const axios = require('axios');
const baseUrl = 'http://localhost:3000/';

export class ApiClient {

  async get(path: string): Promise<any> {
    Logger.println()
    let url = baseUrl + path
    Logger.logBold('GET ' + url)
    try {
      let response = await axios.get(url);
      Logger.log(response.status + ' ' + response.statusText)
      Logger.logData(JSON.stringify(response.data, null, 2))
      return response.data;
    } catch (e: any) {
      if (e.name == 'AxiosError') {
        Logger.logError(e.response.status + ': ' + e.response.data.message)
        throw new ApiException(e.response.data);
      }
      console.log(e);
      throw e;
    } finally {
      Logger.println()
    }
  }

  async post(path: string, body?: any): Promise<any> {
    Logger.println()
    let url = baseUrl + path
    Logger.logBold('POST ' + url)
    try {
      let response = await axios.post(url, body);
      Logger.log(response.status + ' ' + response.statusText)
      Logger.logData(JSON.stringify(response.data, null, 2))
      return response.data;
    } catch (e: any) {
      if (e.name == 'AxiosError') {
        Logger.logError(e.response.status + ': ' + e.response.data.message)
        throw new ApiException(e.response.data);
      }
      console.log(e);
      throw e;
    } finally {
      Logger.println()
    }
  }

}

export const BaseClient: ApiClient = new ApiClient();
