import { BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { expectError } from '../../../src/expect.error';
import { Matchers, validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/register] functional', () => {

  test('Success', async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await BaseClient.post('register', { login, password });

    let loginResult = await BaseClient.post('login', { login, password });
    validateMatch(loginResult, {
      accessToken: Matchers.string(),
    });
  });

  test('User not found', expectError(async () => {
    let login = RandomUtils.login();

    await BaseClient.post('login', { login, password: RandomUtils.password() });
  }, 401, 'User with specified [login] not found'));

  test('Wrong password', expectError(async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await BaseClient.post('register', { login, password });

    await BaseClient.post('login', { login, password: RandomUtils.password() });
  }, 401, 'Password is incorrect'));

});