import { AuthCommons } from '../../../../src/auth.commons';
import { Random } from '@amakovskyi/api-auditor';
import { expectError } from '../../../../src/expect.error';

describe('POST [/followers/follow] validation', () => {

  test('[userId] is null', expectError(async () => {
    let user = await AuthCommons.newUser();
    await user.post('followers/follow', {
      userId: null,
    });
  }));

  test('[userId] is not uuid', expectError(async () => {
    let user = await AuthCommons.newUser();
    await user.post('followers/follow', {
      userId: 'not-uuid',
    });
  }));

  test('[userId] is wrong', expectError(async () => {
    let user = await AuthCommons.newUser();
    await user.post('followers/follow', {
      userId: Random.uuid(),
    });
  }));

});