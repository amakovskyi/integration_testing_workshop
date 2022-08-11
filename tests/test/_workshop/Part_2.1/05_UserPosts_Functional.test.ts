import { AuthCommons } from '../../../src/auth.commons';
import { RandomUtils } from '../../../src/random.utils';
import { validate } from 'uuid';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';
import { BaseClient } from '../../../src/api.client';
import { validateApiException } from '../../../src/api.exception';
import { Users } from '../../server/users/Users';

describe('Workshop part 2.1. Testing "User posts". Functional test, cascade validation.', () => {

  // 1. Create user post
  // 2. Validate user post seen in posts list
  test('Create and validate user post', async () => {
    // PREPARE
    let user = await AuthCommons.newUser();
    // EXECUTE
    let text = Random.text();
    let postId = await user.post('posts/createPost', { text });

    // VALIDATION
    validateMatch(postId, Matchers.uuid());

    let list = await user.get('posts/myPosts', { count: 10, offset: 0 });
    validateMatch(list, {
      total: 1,
      items: [
        {
          id: postId,
          text: text,
        },
      ],
    });
  });

  // 1. Create user post
  // 2. Delete user post
  // 3. Validate user post does not appear in posts list
  test('Delete user post', async () => {
    // PREPARE
    let user = await AuthCommons.newUser();
    let text = Random.text();
    let postId = await user.post('posts/createPost', { text });

    // EXECUTE ACTION
    await user.post('posts/deletePost', { id: postId });

    // VALIDATE RESULT
    let list = await user.get('posts/myPosts', { count: 10, offset: 0 });
    validateMatch(list, {
      total: 0,
      items: [],
    });
  });

  // 1. Create 3 posts
  // 2. Get posts list
  // 3. Validate user posts sort order
  test('User posts list: order', async () => {
    let user = await AuthCommons.newUser();
    let post1 = await user.post('posts/createPost', { text: Random.text() });
    let post2 = await user.post('posts/createPost', { text: Random.text() });
    let post3 = await user.post('posts/createPost', { text: Random.text() });

    let list = await user.get('posts/myPosts', { count: 10, offset: 0 });
    validateMatch(list, {
      items: [
        { id: post3 },
        { id: post2 },
        { id: post1 },
      ],
    });
  });

  // 1. Create user
  // 2. Fill profile
  // 3. Get posts list
  // 4. Validate user profile filled correctly
  test('User posts list: post full content', async () => {
    let user = await AuthCommons.newUser();
    let profile = await Users.fillProfile(user);
    let postId = await user.post('posts/createPost', { text: Random.text() });
    let list = await user.get('posts/myPosts', { count: 10, offset: 0 });
    validateMatch(list, {
      items: [
        {
          id: postId,
          author: {
            id: profile.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
          },
        },
      ],
    });
  });

});