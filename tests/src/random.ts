export class Random {

  static int(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  static string(length: number): string {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let i = 0;
    for (i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }

  static login(): string {
    return Random.string(12);
  }

  static password(): string {
    return Random.string(12);
  }

}