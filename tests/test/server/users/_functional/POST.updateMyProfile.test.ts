import { RandomUtils } from '../../../../src/random.utils';
import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/users/updateMyProfile] functional', () => {

  test('Fill data', async () => {
    let user = await AuthCommons.newUser();
    let firstName = Random.string(16);
    let lastName = Random.string(16);
    let description = Random.text(128);
    await user.post('users/updateMyProfile', { firstName, lastName, description });

    let data = await user.get('users/me');
    validateMatch(data, {
      firstName,
      lastName,
      description,
    });
  });

});