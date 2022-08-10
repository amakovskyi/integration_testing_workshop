import { AuthCommons } from '../../../../src/auth.commons';
import { validateMatch } from '@amakovskyi/api-auditor';

describe('[User profile] responds to [Follower state]', () => {

  test('User not followed', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    let profile = await user.get('users/getProfile', {
      id: other.userId,
    });
    validateMatch(profile, {
      isFollowed: false,
    });
  });

  test('User followed', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    await user.post('followers/follow', {
      userId: other.userId,
    });

    let profile = await user.get('users/getProfile', {
      id: other.userId,
    });
    validateMatch(profile, {
      isFollowed: true,
    });
  });

  test('User followed and then unfollowed', async () => {
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