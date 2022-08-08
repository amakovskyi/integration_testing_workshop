import { BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { expectError } from '../../../src/expect.error';

describe('POST [/register] validation', () => {

  test('Cannot register with empty login', expectError(async () => {
    await BaseClient.post('register', {
      login: '',
      password: RandomUtils.password(),
    });
  }, 400, '[login] cannot be empty'));

  test('Cannot register with empty password', expectError(async () => {
    await BaseClient.post('register', {
      login: RandomUtils.login(),
      password: '',
    });
  }, 400, '[password] cannot be empty'));

});