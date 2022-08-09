import { RandomUtils } from '../../../../src/random.utils';
import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('[Follow user] response in [User profile]', () => {

  test('User not followed', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    let profile = await user.get('users/getProfile', {
      id: await other.getUserId(),
    });
    validateMatch(profile, {
      isFollowed: false,
    });
  });

  test('User followed', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    await user.post('followers/follow', {
      userId: await other.getUserId(),
    });

    let profile = await user.get('users/getProfile', {
      id: await other.getUserId(),
    });
    validateMatch(profile, {
      isFollowed: true,
    });
  });

  test('User followed and then unfollowed', async () => {
    let user = await AuthCommons.newUser();
    let other = await AuthCommons.newUser();

    await user.post('followers/follow', {
      userId: await other.getUserId(),
    });
    await user.post('followers/unfollow', {
      userId: await other.getUserId(),
    });

    let profile = await user.get('users/getProfile', {
      id: await other.getUserId(),
    });
    validateMatch(profile, {
      isFollowed: false,
    });
  });

});