import { Logger } from '../../../src/logging';
import axios, { AxiosRequestConfig } from 'axios';
import { Random } from '@amakovskyi/api-auditor';
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
  });

  // TODO ApiClient class

  // 1. Create class "ApiClient"
  // 2. Wrap API call using "ApiClient"
  // 3. Validate result
  test('Wrapping API calls to class "ApiClient"', async () => {
    // TODO
  });

  // 1. Register and login with "ApiClient"
  // 2. Retrieve token and create "ApiClient" with authorization
  // 3. INVOKE "Get my info" endpoint and validate result
  // -- UuidUtils.isValidUuid
  test('Add user authorization to "ApiClient"', async () => {
    // TODO
  });

  test('Use matchers', async () => {
    // TODO
  });

});