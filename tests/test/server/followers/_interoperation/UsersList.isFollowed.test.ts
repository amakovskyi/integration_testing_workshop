import { ArrayMatchers, Random, RandomArray, validateMatch } from '@amakovskyi/api-auditor';
import { AuthCommons } from '../../../../src/auth.commons';
import { ApiClient } from '../../../../src/api.client';
import { Users } from '../../users/Users';
import { Followers } from '../Followers';

describe('[Users list] responds to [Follow user]', () => {

  test('List of users', async () => {
    let firstName = Random.string(24);
    let user = await AuthCommons.newUser();
    let others: ApiClient[] = [];
    for (let i = 0; i < 10; i++) {
      let other = await AuthCommons.newUser();
      await Users.updateMyProfile(other, {
        firstName,
        lastName: Random.string(12),
        description: null,
      });
      others.push(other);
    }

    let followed = RandomArray.someItems(others, 5);
    for (let other of followed) {
      await Followers.follow(user, other.userId!);
    }
    let list = await user.get('users/list', { query: firstName, count: 10, offset: 0 });
    validateMatch(list, {
      items: ArrayMatchers.containingOnly(
        others.map(it => {
          return {
            id: it.userId,
            isFollowed: followed.includes(it),
          };
        }),
        {
          requireAll: true,
        },
      ),
    });
  });

});