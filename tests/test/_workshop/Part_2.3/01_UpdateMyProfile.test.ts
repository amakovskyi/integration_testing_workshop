import { expectError } from '../../../src/expect.error';
import { AuthCommons } from '../../../src/auth.commons';
import { ApiClient } from '../../../src/api.client';
import { Random } from '@amakovskyi/api-auditor';

describe('POST [/users/updateMyProfile] dimensions', () => {

  // [firstName] DIMENSION
  // 1. Missing
  // 2. Nullability
  // 3. Empty string
  // 4. Value format

  let user: ApiClient;

  beforeAll(async () => {
    user = await AuthCommons.newUser();
  });

  test('[firstName] is missing', expectError(async () => {
    await user.post('users/updateMyProfile', {
      lastName: Random.string(12),
      description: Random.text(),
    });
  }));

  test('[firstName] is null', expectError(async () => {
    await user.post('users/updateMyProfile', {
      firstName: null,
      lastName: Random.string(12),
      description: Random.text(),
    });
  }));

  test('[firstName] is empty', expectError(async () => {
    await user.post('users/updateMyProfile', {
      firstName: '',
      lastName: Random.string(12),
      description: Random.text(),
    });
  }));

  test('[firstName] is not a string', expectError(async () => {
    await user.post('users/updateMyProfile', {
      firstName: [1, 2, 3],
      lastName: Random.string(12),
      description: Random.text(),
    });
  }));

  // [lastName] DIMENSION
  // 1. Missing
  // 2. Nullability
  // 3. Empty string
  // 4. Value format

  test('[lastName] is missing', expectError(async () => {
    // TODO
  }));

  test('[lastName] is null', expectError(async () => {
    // TODO
  }));

  test('[lastName] is empty', expectError(async () => {
    // TODO
  }));

  test('[lastName] is not a string', expectError(async () => {
    // TODO
  }));

  // [description] DIMENSION
  // 1. Missing
  // 2. Nullability
  // 3. Empty string
  // 4. Value format

  test('[description] is missing', expectError(async () => {
    // TODO
  }));

  test('[description] is null', expectError(async () => {
    // TODO
  }));

  test('[description] is empty', expectError(async () => {
    // TODO
  }));

  test('[description] is not a string', expectError(async () => {
    // TODO
  }));

});