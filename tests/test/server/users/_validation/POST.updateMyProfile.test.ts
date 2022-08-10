import { AuthCommons } from '../../../../src/auth.commons';
import { expectError } from '../../../../src/expect.error';

describe('POST [/users/updateMyProfile] validation', () => {

  test('[firstName] is not string', expectError(async () => {
    let user = await AuthCommons.newUser();
    await user.post('users/updateMYProfile', {
      firstName: [1, 2, 3],
    });
  }));

  test('[lastName] is not string', expectError(async () => {
    let user = await AuthCommons.newUser();
    await user.post('users/updateMYProfile', {
      lastName: [1, 2, 3],
    });
  }));

  test('[description] is not string', expectError(async () => {
    let user = await AuthCommons.newUser();
    await user.post('users/updateMYProfile', {
      description: [1, 2, 3],
    });
  }));

});