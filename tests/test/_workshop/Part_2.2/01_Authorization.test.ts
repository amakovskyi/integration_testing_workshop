import { BASE_API_URL, BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { Random, validateMatch } from '@amakovskyi/api-auditor';
import axios from 'axios';
import { AuthCommons } from '../../../src/auth.commons';
import { validateApiException } from '../../../src/api.exception';

describe('Feature test: authorization', () => {

  // 1. Register and login
  // 2. Make API call which requires authorization
  // 3. Validate success result
  test('Auth works', async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    // TODO
    await BaseClient.post('register', { login, password });
    let loginResponse = await BaseClient.post('login', { login, password });
    let authorized = BaseClient.withToken(loginResponse.accessToken);
    await authorized.get('users/me');
  });

  // 1. Make API call which requires authorization without authorization
  // 2. Validate error result
  test('Unauthorized', async () => {
    try {
      await BaseClient.get('users/me');
      fail();
    } catch (e) {
      validateApiException(e, 401, 'Unauthorized');
    }
  });

  // 1. Make API call which requires authorization with wrong token
  // 2. Validate error result
  test('Incorrect token', async () => {
    try {
      let client = BaseClient.withToken(Random.string(64));
      await client.get('users/me');
      fail();
    } catch (e) {
      validateApiException(e, 401, 'Unauthorized');
    }
  });

});