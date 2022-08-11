import { Logger } from '../../../src/logging';
import axios, { AxiosRequestConfig } from 'axios';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';
import { BASE_API_URL } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { UuidUtils } from '@amakovskyi/api-auditor/dist/utils/uuid.utils';

describe('Workshop part 2.1. Basic test.', () => {

  // 1. Make API call with axios
  // 2. Validate result
  // 3. Add basic logging
  // let response = await axios.get()
  // response.data
  test('Basic API call', async () => {
    // TODO
    let url = BASE_API_URL + '?message=hello';
    Logger.log('GET ' + url);
    let response = await axios.get(url);
    Logger.log('RESPONSE: ' + response.status + ' ' + response.statusText);
    Logger.log('RESPONSE BODY');
    Logger.log(JSON.stringify(response.data, null, 2));
    expect(response.data.status).toEqual('Up');
    expect(response.data.message).toEqual('hello');
  });

  // TODO ApiClient class

  class ApiClient {

    constructor(
      readonly accessToken: string | null = null,
    ) {
    }

    async get(path: string): Promise<any> {
      Logger.println();
      let url = BASE_API_URL + path;
      Logger.log('GET ' + url);
      let config: AxiosRequestConfig = {};
      if (this.accessToken != null) {
        config.headers = {
          authorization: 'Token ' + this.accessToken,
        };
      }
      let response = await axios.get(url, config);
      Logger.log('RESPONSE: ' + response.status + ' ' + response.statusText);
      Logger.log('RESPONSE BODY');
      Logger.log(JSON.stringify(response.data, null, 2));
      Logger.println();
      return response.data;
    }

    async post(path: string, body: any): Promise<any> {
      Logger.println();
      let url = BASE_API_URL + path;
      Logger.log('POST ' + url);
      Logger.log('REQUEST BODY');
      Logger.log(JSON.stringify(body, null, 2));
      let config: AxiosRequestConfig = {};
      if (this.accessToken != null) {
        config.headers = {
          authorization: 'Token ' + this.accessToken,
        };
      }
      let response = await axios.post(url, body, config);
      Logger.log('RESPONSE: ' + response.status + ' ' + response.statusText);
      Logger.log('RESPONSE BODY');
      Logger.log(JSON.stringify(response.data, null, 2));
      Logger.println();
      return response.data;
    }

  }

  // 1. Create class "ApiClient"
  // 2. Wrap API call using "ApiClient"
  // 3. Validate result
  test('Wrapping API calls to class "ApiClient"', async () => {
    // TODO
    let client = new ApiClient();
    let response = await client.get('?message=hello');
    expect(response.message).toEqual('hello');
    expect(response.message).toEqual('hello');
  });

  // 1. Register and login with "ApiClient"
  // 2. Retrieve token and create "ApiClient" with authorization
  // 3. INVOKE "Get my info" endpoint and validate result
  // -- UuidUtils.isValidUuid
  test('Add user authorization to "ApiClient"', async () => {
    let client = new ApiClient();
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await client.post('register', {
      login, password,
    });
    let loginResponse = await client.post('login', {
      login, password,
    });
    expect(typeof loginResponse.accessToken).toEqual('string');

    let user = new ApiClient(loginResponse.accessToken);
    let response = await user.get('users/me');
    expect(typeof response.id).toEqual('string');
    expect(UuidUtils.isValidUuid(response.id)).toBeTruthy();
    expect(response.login).toEqual(login);
    expect(response.firstName).toBeNull();
    expect(response.lastName).toBeNull();
    expect(response.description).toBeNull();
  });

  test('Use matchers', async () => {
    let client = new ApiClient();
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await client.post('register', {
      login, password,
    });
    let loginResponse = await client.post('login', {
      login, password,
    });
    validateMatch(loginResponse, {
      accessToken: Matchers.string()
    })

    let user = new ApiClient(loginResponse.accessToken);
    let response = await user.get('users/me');

    validateMatch(response, {
      id: Matchers.uuid(),
      login: login,
      test: 'value'
    })
  });

});