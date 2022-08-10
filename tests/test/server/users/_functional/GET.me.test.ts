import { RandomUtils } from '../../../../src/random.utils';
import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('GET [/users/me] functional', () => {

  test('Correct empty info returned', async () => {
    let login = RandomUtils.login();
    let user = await AuthCommons.newUser(login);
    let data = await user.get('users/me');
    validateMatch(data, ObjectMatchers.exactly({
      id: Matchers.uuid(),
      login,
      firstName: null,
      lastName: null,
      description: null,
    }));
  });

  test('Correct filled info returned', async () => {
    let login = RandomUtils.login();
    let user = await AuthCommons.newUser(login);
    let firstName = Random.string(16);
    let lastName = Random.string(16);
    let description = Random.text(128);
    await user.post('users/updateMyProfile', { firstName, lastName, description });

    let data = await user.get('users/me');
    validateMatch(data, ObjectMatchers.exactly({
      id: Matchers.uuid(),
      login,
      firstName,
      lastName,
      description,
    }));
  });

});