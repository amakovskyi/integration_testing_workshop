import { AuthCommons } from '../../../src/auth.commons';
import { RandomUtils } from '../../../src/random.utils';
import { validate } from 'uuid';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('Workshop part 2.1. Testing "My profile".', () => {

  // 1. Create user using AuthCommons
  // 2. Validate result
  test('My profile: default state', async () => {
    let login = RandomUtils.login();
    let user = await AuthCommons.newUser(login);
    let response = await user.get('users/me');

    validateMatch(response, {
      id: Matchers.uuid(),
      login: login,
      firstName: null,
      lastName: null,
      description: null,
    });
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
    let login = RandomUtils.login();
    let user = await AuthCommons.newUser(login);

    let firstName = Random.string(16)
    let lastName = Random.string(16)
    let description = Random.string(64)

    await user.post('users/updateMyProfile', {
      firstName, lastName, description
    })

    let response = await user.get('users/me');
    validateMatch(response, {
      id: Matchers.uuid(),
      login: login,
      firstName: firstName,
      lastName: lastName,
      description: description,
    });
  });

});