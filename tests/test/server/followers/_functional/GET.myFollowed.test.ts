import { AuthCommons } from '../../../../src/auth.commons';
import { ArrayMatchers, Matchers, validateMatch } from '@amakovskyi/api-auditor';
import { Followers } from '../Followers';

describe('GET [/followers/myFollowed] functional', () => {

  test('Success', async () => {
    let user = await AuthCommons.newUser();

    let followers = await AuthCommons.newUsers(5);
    for (let other of followers) {
      await Followers.follow(user, other.userId!);
    }

    let list = await user.get('followers/myFollowed');
    validateMatch(list, ArrayMatchers.containingOnly(
      followers.map(it => {
        return {
          id: it.userId,
          firstName: Matchers.string({ canBeNull: true }),
          lastName: Matchers.string({ canBeNull: true }),
          description: Matchers.string({ canBeNull: true }),
          isFollowed: true, // is it is "my followed" should be always true
        };
      }),
      { requireAll: true },
    ));
  });

});