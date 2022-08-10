import { BASE_API_URL, BaseClient } from '../../../src/api.client';
import { RandomUtils } from '../../../src/random.utils';
import { validateMatch } from '@amakovskyi/api-auditor';
import axios from 'axios';

describe('Feature test: authorization', () => {

  // 1. Register and login
  // 2. Make API call which requires authorization
  // 3. Validate success result
  test('Auth works', async () => {
    let login = RandomUtils.login();
    let password = RandomUtils.password();
    // TODO
  });

  // 1. Make API call which requires authorization without authorization
  // 2. Validate error result
  test('Unauthorized', async () => {
    // TODO
  });

  // 1. Make API call which requires authorization with wrong token
  // 2. Validate error result
  test('Incorrect token', async () => {
    // TODO
  });

});