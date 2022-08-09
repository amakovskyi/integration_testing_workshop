import { RandomUtils } from '../../../../src/random.utils';
import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/followers/follow] functional', () => {

  test('Success', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    await user.post('followers/follow', {
      userId: await other.getUserId(),
    });

    validateMatch(
      await user.get('users/getProfile', {
        id: await other.getUserId(),
      }), {
        isFollowed: true,
      },
    );
  });

});