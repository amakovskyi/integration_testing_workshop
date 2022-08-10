import { RandomUtils } from '../../../../src/random.utils';
import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('GET [/users/getProfile] functional', () => {

  test('Correct empty info returned', async () => {
    let user = await AuthCommons.newUser();

    let client = await AuthCommons.newUser();
    let data = await client.get('users/getProfile', { id: user.userId });
    validateMatch(data, ObjectMatchers.exactly({
      id: Matchers.uuid(),
      firstName: null,
      lastName: null,
      description: null,
      isFollowed: Matchers.boolean(),
    }));
  });

  test('Correct filled info returned', async () => {
    let user = await AuthCommons.newUser();
    let firstName = Random.string(16);
    let lastName = Random.string(16);
    let description = Random.text(128);
    await user.post('users/updateMyProfile', { firstName, lastName, description });

    let client = await AuthCommons.newUser();
    let data = await client.get('users/getProfile', { id: user.userId });
    validateMatch(data, ObjectMatchers.exactly({
      id: Matchers.uuid(),
      firstName,
      lastName,
      description,
      isFollowed: Matchers.boolean(),
    }));
  });

});