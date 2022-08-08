import { BASE_API_URL, BaseClient } from '../../../../src/api.client';
import { RandomUtils } from '../../../../src/random.utils';
import { Matchers, Random, validateMatch } from 'api-auditor';
import { expectError } from '../../../../src/expect.error';
import axios from 'axios';
import { Logger } from '../../../../src/logging';
import { ApiException } from '../../../../src/api.exception';
import { AuthCommons } from '../../../../src/auth.commons';

describe('GET [/users/me] functional', () => {

  test('Correct info returned', async () => {
    let login = RandomUtils.login();
    let user = await AuthCommons.newUser(login);
    let data = await user.get('users/me');
    validateMatch(data, {
      id: Matchers.uuid(),
      login,
    });
  });

});