import { AuthCommons } from '../../../../src/auth.commons';
import { ArrayMatchers, Matchers, Random, RandomArray, validateMatch } from '@amakovskyi/api-auditor';
import { ApiClient } from '../../../../src/api.client';
import { Users } from '../Users';

describe('GET [/users/list] functional', () => {

  let totalBefore: number;
  let users: ApiClient[] = [];

  beforeAll(async () => {
    let someUser = await AuthCommons.newUser();
    let listBefore = await someUser.get('users/list', {
      count: 1, offset: 0,
    });
    totalBefore = listBefore.total;
    for (let i = 0; i < 10; i++) {
      let user = await AuthCommons.newUser();
      await Users.updateMyProfile(user, {
        firstName: Random.string(16),
        lastName: Random.string(16),
        description: Random.text(128),
      });
      users.push(user);
    }
  });

  test('Users list total count', async () => {
    let user = RandomArray.singleItem(users);
    let list = await user.get('users/list', {
      count: 1, offset: 0,
    });
    validateMatch(list, {
      total: totalBefore + users.length,
    });
  });

  test('Users list and offset', async () => {
    let user = RandomArray.singleItem(users);
    let list = await user.get('users/list', {
      count: 10, offset: 0,
    });
    validateMatch(list, {
      items: ArrayMatchers.any({
        expectedLength: 10,
        itemMatch: {
          id: Matchers.uuid(),
          firstName: Matchers.string({ canBeNull: true }),
          lastName: Matchers.string({ canBeNull: true }),
          description: Matchers.string({ canBeNull: true }),
          isFollowed: Matchers.boolean(),
        },
      }),
    });

    let listOffset = await user.get('users/list', {
      count: 5, offset: 5,
    });
    validateMatch(listOffset, {
      items: ArrayMatchers.any({
        expectedLength: 5,
      }),
    });
    for (let i = 0; i < listOffset.items.length; i++) {
      expect(listOffset.items[i]).toEqual(list.items[i + 5]);
    }
  });

  test('Users list', async () => {
    let user = RandomArray.singleItem(users);
    let list = await user.get('users/list', {
      count: 10, offset: 0,
    });
    validateMatch(list, {
      items: ArrayMatchers.any({
        expectedLength: 10,
      }),
    });

    let listOffset = await user.get('users/list', {
      count: 5, offset: 5,
    });
    validateMatch(listOffset, {
      items: ArrayMatchers.any({
        expectedLength: 5,
      }),
    });
    for (let i = 0; i < listOffset.items.length; i++) {
      expect(listOffset.items[i]).toEqual(list.items[i + 5]);
    }
  });

  test('Users list items content', async () => {
    let user = RandomArray.singleItem(users);
    let list = await user.get('users/list', {
      count: 10, offset: 0,
    });
    for (let item of list.items) {
      let userId = item.id
      let profile = await Users.getProfile(user, userId)
      expect(profile).toEqual(item)
    }
  });

});