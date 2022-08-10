import { ApiClient } from '../../../src/api.client';

export class Followers {

  static async follow(client: ApiClient, userId: string) {
    await client.post('followers/follow', {
      userId,
    });
  }

}