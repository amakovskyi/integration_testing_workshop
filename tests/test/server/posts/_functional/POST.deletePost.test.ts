import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/posts/deletePost] functional', () => {

  test('Deleted post from list', async () => {
    let user = await AuthCommons.newUser();
    let post1 = await user.post('posts/createPost', {
      text: Random.text(),
    });
    let post2 = await user.post('posts/createPost', {
      text: Random.text(),
    });
    let post3 = await user.post('posts/createPost', {
      text: Random.text(),
    });

    validateMatch(
      await user.get('posts/myPosts', { count: 10, offset: 0 }),
      {
        total: 3,
        items: [
          { id: post3 },
          { id: post2 },
          { id: post1 },
        ],
      },
    );

    await user.post('posts/deletePost', { id: post2 });

    validateMatch(
      await user.get('posts/myPosts', { count: 10, offset: 0 }),
      {
        total: 2,
        items: [
          { id: post3 },
          { id: post1 },
        ],
      },
    );
  });

});