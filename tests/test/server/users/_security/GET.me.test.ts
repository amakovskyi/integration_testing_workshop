import { BaseClient } from '../../../../src/api.client';
import { expectError } from '../../../../src/expect.error';

describe('GET [/users/me] security', () => {

  test('Auth required', expectError(async () => {
    await BaseClient.get('users/me');
  }, 401, 'Unauthorized'));

});