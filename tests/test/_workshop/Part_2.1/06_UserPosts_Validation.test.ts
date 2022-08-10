import { AuthCommons } from '../../../src/auth.commons';
import { RandomUtils } from '../../../src/random.utils';
import { validate } from 'uuid';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';
import { BaseClient } from '../../../src/api.client';
import { validateApiException } from '../../../src/api.exception';
import { Users } from '../../server/users/Users';
import { UuidUtils } from '@amakovskyi/api-auditor/dist/utils/uuid.utils';
import { expectError } from '../../../src/expect.error';

describe('Workshop part 2.1. Testing "User posts". Validation test.', () => {

  // 1. Try to create user post with wrong format text
  // 2. Validate response error
  test('Create post: wrong text', expectError(async () => {
    // TODO
  }));

  // 1. Try to delete post with wrong id
  // 2. Validate response error
  test('Create post: wrong text', expectError(async () => {
    // TODO
  }));


});