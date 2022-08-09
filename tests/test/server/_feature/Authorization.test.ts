import { BASE_API_URL, BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { expectError } from '../../../src/expect.error';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('Authorization', () => {

  test('Auth works', async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await BaseClient.post('register', { login, password });

    let loginResult = await BaseClient.post('login', { login, password });
    validateMatch(loginResult, {
      accessToken: Matchers.string(),
    });
    let token = loginResult.accessToken;
    let client = BaseClient.withToken(token);

    // success means auth works
    await client.get('users/me');
  });

  test('Unauthorized', expectError(async () => {
    await BaseClient.get('users/me');
  }, 401, 'Unauthorized'));

  test('Incorrect token', expectError(async () => {
    let token = Random.uuid();
    let client = BaseClient.withToken(token);
    await client.get('users/me');
  }, 401, 'Unauthorized'));

  test('Wrong token format', async () => {
    const axios = require('axios');
    let url = BASE_API_URL + 'users/me';
    try {
      await axios.get(url, {
        headers: {
          authorization: 'Some wrong string ' + Random.string(32),
        },
      });
      fail();
    } catch (e: any) {
      if (e.name == 'AxiosError') {
        expect(e.response.status).toEqual(401)
        expect(e.response.data.message).toEqual('Unauthorized')
      } else {
        throw e
      }
    }
  });

});