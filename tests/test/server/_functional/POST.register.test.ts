import { BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { expectError } from '../../../src/expect.error';
import { Matchers, validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/register] functional', () => {

  test('Success', async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await BaseClient.post('register', { login, password });

    // user can log in
    let loginResult = await BaseClient.post('login', { login, password });
    validateMatch(loginResult, {
      accessToken: Matchers.string(),
    });
  });

  test('Cannot register same user again', expectError(async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    await BaseClient.post('register', { login, password });

    // register again with same credentials should fail
    await BaseClient.post('register', { login, password });
  }, 400, 'User with specified [login] already exists'));

});