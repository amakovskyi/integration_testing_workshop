import { AuthCommons } from '../../../../src/auth.commons';
import { ArrayMatchers, validateMatch } from '@amakovskyi/api-auditor';
import { Followers } from '../../followers/Followers';
import { Users } from '../Users';

describe('[Followers list] responds to [User profile]', () => {

  test('My followers', async () => {
    let empty = await AuthCommons.newUser();
    let filled = await AuthCommons.newUser();
    let filledProfile = await Users.fillProfile(filled);

    let user = await AuthCommons.newUser();
    await Followers.follow(empty, user.userId!);
    await Followers.follow(filled, user.userId!);

    let list = await user.get('followers/myFollowers');
    validateMatch(list, ArrayMatchers.containingOnly([
      {
        id: empty.userId,
        firstName: null,
        lastName: null,
        description: null,
      },
      {
        id: filled.userId,
        firstName: filledProfile.firstName,
        lastName: filledProfile.lastName,
        description: filledProfile.description,
      },
    ], { requireAll: true }));
  });

  test('User followers', async () => {
    let caller = await AuthCommons.newUser();

    let empty = await AuthCommons.newUser();
    let filled = await AuthCommons.newUser();
    let filledProfile = await Users.fillProfile(filled);

    let user = await AuthCommons.newUser();
    await Followers.follow(empty, user.userId!);
    await Followers.follow(filled, user.userId!);

    let list = await caller.get('followers/userFollowers', { userId: user.userId });
    validateMatch(list, ArrayMatchers.containingOnly([
      {
        id: empty.userId,
        firstName: null,
        lastName: null,
        description: null,
      },
      {
        id: filled.userId,
        firstName: filledProfile.firstName,
        lastName: filledProfile.lastName,
        description: filledProfile.description,
      },
    ], { requireAll: true }));
  });

  test('My followed', async () => {
    let empty = await AuthCommons.newUser();
    let filled = await AuthCommons.newUser();
    let filledProfile = await Users.fillProfile(filled);

    let user = await AuthCommons.newUser();
    await Followers.follow(user, empty.userId!);
    await Followers.follow(user, filled.userId!);

    let list = await user.get('followers/myFollowed');
    validateMatch(list, ArrayMatchers.containingOnly([
      {
        id: empty.userId,
        firstName: null,
        lastName: null,
        description: null,
      },
      {
        id: filled.userId,
        firstName: filledProfile.firstName,
        lastName: filledProfile.lastName,
        description: filledProfile.description,
      },
    ], { requireAll: true }));
  });

  test('User followed', async () => {
    let client = await AuthCommons.newUser();

    let empty = await AuthCommons.newUser();
    let filled = await AuthCommons.newUser();
    let filledProfile = await Users.fillProfile(filled);

    let user = await AuthCommons.newUser();
    await Followers.follow(user, empty.userId!);
    await Followers.follow(user, filled.userId!);

    let list = await client.get('followers/userFollowed', { userId: user.userId });
    validateMatch(list, ArrayMatchers.containingOnly([
      {
        id: empty.userId,
        firstName: null,
        lastName: null,
        description: null,
      },
      {
        id: filled.userId,
        firstName: filledProfile.firstName,
        lastName: filledProfile.lastName,
        description: filledProfile.description,
      },
    ], { requireAll: true }));
  });

});