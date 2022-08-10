import { AuthCommons } from '../../../src/auth.commons';
import { RandomUtils } from '../../../src/random.utils';
import { validate } from 'uuid';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';
import { BaseClient } from '../../../src/api.client';
import { validateApiException } from '../../../src/api.exception';
import { Users } from '../../server/users/Users';

describe('Workshop part 2.1. Testing "User posts". Functional test, cascade validation.', () => {

  // 1. Create user post
  // 2. Validate user post seen in posts list
  test('Create and validate user post', async () => {
    // TODO
  });

  // 1. Create user post
  // 2. Delete user post
  // 3. Validate user post does not appear in posts list
  test('Delete user post', async () => {
    // TODO
  });

  // 1. Create 3 posts
  // 2. Get posts list
  // 3. Validate user posts sort order
  test('User posts list: order', async () => {
    // TODO
  });

  // 1. Create user
  // 2. Fill profile
  // 3. Get posts list
  // 4. Validate user post filled correctly
  test('User posts list: post full content', async () => {
    // TODO
  });

});