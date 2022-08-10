import { AuthCommons } from '../../../../src/auth.commons';
import { validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/followers/follow] functional', () => {

  test('Success', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    await user.post('followers/follow', {
      userId: other.userId,
    });
    await user.post('followers/unfollow', {
      userId: other.userId,
    });

    let profile = await user.get('users/getProfile', {
      id: other.userId,
    });
    validateMatch(profile, {
      isFollowed: false,
    });
  });

});