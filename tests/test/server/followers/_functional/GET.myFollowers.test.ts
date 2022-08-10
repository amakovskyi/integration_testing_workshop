import { AuthCommons } from '../../../../src/auth.commons';
import { ArrayMatchers, Matchers, validateMatch } from '@amakovskyi/api-auditor';
import { Followers } from '../Followers';

describe('GET [/followers/myFollowers] functional', () => {

  test('Success', async () => {
    let user = await AuthCommons.newUser();

    let followers = await AuthCommons.newUsers(5);
    for (let other of followers) {
      await Followers.follow(other, user.userId!);
    }

    let list = await user.get('followers/myFollowers');
    validateMatch(list, ArrayMatchers.containingOnly(
      followers.map(it => {
        return {
          id: it.userId,
          firstName: Matchers.string({ canBeNull: true }),
          lastName: Matchers.string({ canBeNull: true }),
          description: Matchers.string({ canBeNull: true }),
          isFollowed: Matchers.boolean(),
        };
      }),
      { requireAll: true },
    ));
  });

  test('[isFollowed]', async () => {
    let user = await AuthCommons.newUser();

    let followed = await AuthCommons.newUser();
    let notFollowed = await AuthCommons.newUser();
    await Followers.follow(followed, user.userId!);
    await Followers.follow(notFollowed, user.userId!);

    await Followers.follow(user, followed.userId!);

    let list = await user.get('followers/myFollowers');
    validateMatch(list, ArrayMatchers.containingOnly(
      [
        {
          id: followed.userId,
          isFollowed: true,
        },
        {
          id: notFollowed.userId,
          isFollowed: false,
        },
      ],
      { requireAll: true },
    ));
  });

});