import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AuthStorage {

  saveToken(token: string, userId: string) {
    let tokens: any = {};
    if (fs.existsSync('./storage/access-tokens.json')) {
      let raw = fs.readFileSync('./storage/access-tokens.json', 'utf8');
      try {
        tokens = JSON.parse(raw);
      } catch (e) {
        console.log(e);
      }
    }
    tokens[token] = userId;
    fs.writeFileSync('./storage/access-tokens.json', JSON.stringify(tokens, null, 2));
  }

  authByToken(token: string): string {
    let tokens: any = {};
    if (fs.existsSync('./storage/access-tokens.json')) {
      let raw = fs.readFileSync('./storage/access-tokens.json', 'utf8');
      try {
        tokens = JSON.parse(raw);
      } catch (e) {
        console.log(e);
      }
    }
    let userId = tokens[token];
    if (userId == null) {
      throw new HttpException('Unauthorized', 401);
    }
    return userId;
  }

}