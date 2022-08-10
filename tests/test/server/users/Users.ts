import { ApiClient } from '../../../src/api.client';
import { Matchers, Random, validateMatch } from '@amakovskyi/api-auditor';

export class Users {

  static async fillProfile(client: ApiClient): Promise<{
    id: string,
    firstName: string,
    lastName: string,
    description: string,
    isFollowed: boolean,
  }> {
    await Users.updateMyProfile(client, {
      firstName: Random.string(12),
      lastName: Random.string(12),
      description: Random.text(),
    });
    return Users.getProfile(client, client.userId!);
  }

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