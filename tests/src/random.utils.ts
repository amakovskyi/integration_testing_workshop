import { Random } from '@amakovskyi/api-auditor';

export class RandomUtils {

  static login(): string {
    return Random.string(12);
  }

  static password(): string {
    return Random.string(12);
  }

}