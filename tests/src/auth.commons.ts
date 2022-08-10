import { RandomUtils } from './random.utils';
import { ApiClient, BaseClient } from './api.client';
import { Logger } from './logging';

export class AuthCommons {

  static async newUser(
    login: string = RandomUtils.login(),
    password: string = RandomUtils.password(),
  ): Promise<ApiClient> {
    await BaseClient.post('register', { login, password });
    let loginResult = await BaseClient.post('login', { login, password });
    let token = loginResult.accessToken;
    let client = BaseClient.withToken(token);
    await client.loadUserId();
    Logger.log(`AuthCommons.newUser(${login}) -> ${client.userId}`);
    return client;
  }

  static async newUsers(count: number): Promise<ApiClient[]> {
    let result: ApiClient[] = [];
    for (let i = 0; i < count; i++) {
      result.push(await AuthCommons.newUser());
    }
    return result;
  }

}