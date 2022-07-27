import { BaseClient } from '../../../src/api.client';
import { Random } from '../../../src/random';
import { anyString, validateContent } from '../../../src/content.validation';
import { expectError } from '../../../src/expect.error';

describe('POST [/register] functional', () => {

  test('Cannot register with empty login', expectError(async () => {
    await BaseClient.post('register', {
      login: '',
      password: Random.password(),
    });
  }, 400, '[login] cannot be empty'));

  test('Cannot register with empty password', expectError(async () => {
    await BaseClient.post('register', {
      login: Random.login(),
      password: '',
    });
  }, 400, '[password] cannot be empty'));

});