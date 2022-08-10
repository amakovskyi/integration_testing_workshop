import { AuthCommons } from '../../../src/auth.commons';
import { RandomUtils } from '../../../src/random.utils';
import { validate } from 'uuid';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('Workshop part 2.1. Testing "My profile". Functional test.', () => {

  // 1. Create user using AuthCommons
  // 2. Validate result
  test('My profile: default state', async () => {
    // TODO
  });

  // https://www.npmjs.com/package/@amakovskyi/api-auditor
  // rewrite validation using matchers
  test('API-Auditor matcher', async () => {
    // TODO copy code from previous test and use validateMatch()
  });


  // 1. Create user
  // 2. Update profile
  // 3. Validate result
  test('My profile: state after update', async () => {
    // TODO
  });

});