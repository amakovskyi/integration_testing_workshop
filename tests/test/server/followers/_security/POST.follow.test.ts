import { BaseClient } from '../../../../src/api.client';
import { expectError } from '../../../../src/expect.error';

describe('POST [/followers/follow] security', () => {

  test('Unauthorized', expectError(async () => {
    await BaseClient.post('followers/follow');
  }, 401, 'Unauthorized'));

});