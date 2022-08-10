import { AuthCommons } from '../../../../src/auth.commons';
import { Matchers, ObjectMatchers, Random, validateMatch } from '@amakovskyi/api-auditor';

describe('POST [/posts/createPost] functional', () => {

  test('Success', async () => {
    let user = await AuthCommons.newUser();
    let text = Random.text();
    let postId = await user.post('posts/createPost', {
      text: text,
    });
    validateMatch(postId, Matchers.uuid());

    let list = await user.get('posts/myPosts', { count: 10, offset: 0 });
    validateMatch(list, {
      total: 1,
      items: [
        {
          id: postId,
          text,
          author: ObjectMatchers.any(),
        }
      ],
    });
  });

});