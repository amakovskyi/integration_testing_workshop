import { expectError } from '../../../src/expect.error';
import { UuidUtils } from '@amakovskyi/api-auditor/dist/utils/uuid.utils';
import { AuthCommons } from '../../../src/auth.commons';
import { ApiClient } from '../../../src/api.client';
import { Users } from '../../server/users/Users';
import { Random } from '@amakovskyi/api-auditor';

describe('POST [/followers/follow] dimensions', () => {

  // [userId] DIMENSIONS
  // 1. Missing
  // 2. Nullability
  // 3. Value format
  // 4. Not exists
  // 5. Self (my id)
  // 6. Status

  let user: ApiClient;

  beforeAll(async () => {
    user = await AuthCommons.newUser();
  });

  test('[userId] is missing', expectError(async () => {
    // TODO
  }));

  test('[userId] is null', expectError(async () => {
    // TODO
  }));

  test('[userId] is not uuid', expectError(async () => {
    // TODO
  }));

  test('[userId] is wrong', expectError(async () => {
    // UuidUtils.generate()
    // TODO
  }));

  test('[userId] is self', expectError(async () => {
    // TODO
  }));

  test('[userId] is already followed', expectError(async () => {
    // TODO
  }));

});