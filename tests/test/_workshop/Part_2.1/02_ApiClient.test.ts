import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';
import { ApiClient, BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { UuidUtils } from '@amakovskyi/api-auditor/dist/utils/uuid.utils';

describe('Workshop part 2.1. Basic test with ApiClient', () => {

  // Use prepared API client
  test('Login test', async () => {
    // TODO insert code from login test in previous file
    let client = BaseClient;
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

    let user = BaseClient.withToken(loginResponse.accessToken);
    let response = await user.get('users/me');

    validateMatch(response, {
      id: Matchers.uuid(),
      login: login,
    })
  });

});