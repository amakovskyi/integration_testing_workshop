import { ApiClient } from '../../../src/api.client';
import { Matchers, validateMatch } from '@amakovskyi/api-auditor';

export class Users {

  static async updateMyProfile(client: ApiClient, update: {
    firstName: string | null,
    lastName: string | null,
    description: string | null
  }) {
    await client.post('users/updateMyProfile', update);
  }

  static async getProfile(client: ApiClient, id: string): Promise<{
    id: string,
    firstName: string,
    lastName: string,
    description: string,
    isFollowed: boolean,
  }> {
    let data = await client.get('users/getProfile', { id });
    validateMatch(data, {
      id: Matchers.uuid(),
      firstName: Matchers.string({ canBeNull: true }),
      lastName: Matchers.string({ canBeNull: true }),
      description: Matchers.string({ canBeNull: true }),
      isFollowed: Matchers.boolean(),
    });
    return data;
  }

}