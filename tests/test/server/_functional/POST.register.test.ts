import { BaseClient } from '../../../src/api.client';
import { Random } from '../../../src/random';
import { anyString, validateContent } from '../../../src/content.validation';
import { expectError } from '../../../src/expect.error';

describe('POST [/register] functional', () => {

  test('Success', async () => {
    let login = Random.login();
    let password = Random.password();
    await BaseClient.post('register', { login, password });

    // user can log in
    let loginResult = await BaseClient.post('login', { login, password });
    validateContent(loginResult, {
      accessToken: anyString(),
    });
  });

  test('Cannot register same user again', expectError(async () => {
    let login = Random.login();
    let password = Random.password();
    await BaseClient.post('register', { login, password });

    // register again with same credentials should fail
    await BaseClient.post('register', { login, password });
  }, 400, 'User with specified login already exists'));

});