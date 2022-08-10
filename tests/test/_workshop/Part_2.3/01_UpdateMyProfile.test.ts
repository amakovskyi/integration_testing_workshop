import { expectError } from '../../../src/expect.error';
import { AuthCommons } from '../../../src/auth.commons';
import { ApiClient } from '../../../src/api.client';

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
    // TODO
  }));

  test('[firstName] is null', expectError(async () => {
    // TODO
  }));

  test('[firstName] is empty', expectError(async () => {
    // TODO
  }));

  test('[firstName] is not a string', expectError(async () => {
    // TODO
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