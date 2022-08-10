import { AuthCommons } from '../../../src/auth.commons';
import { RandomUtils } from '../../../src/random.utils';
import { validate } from 'uuid';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';
import { BaseClient } from '../../../src/api.client';
import { validateApiException } from '../../../src/api.exception';
import { Users } from '../../server/users/Users';
import { expectError } from '../../../src/expect.error';

describe('Workshop part 2.1. Testing "User posts". Security test.', () => {

  // 1. Try to create user post from unauthorized user
  // 2. Validate response error
  test('Create post: Unauthorized', expectError(async () => {
    // TODO
  }));

  // 1. Create user post
  // 2. Try to delete user post from unauthorized user
  // 3. Validate response error
  test('Delete post: Unauthorized', expectError(async () => {
    // TODO
  }));

  // 1. Create user post
  // 2. Try to delete user post from other user
  // 3. Validate response error
  test('Delete post: not an author', expectError(async () => {
    // TODO
  }));

});