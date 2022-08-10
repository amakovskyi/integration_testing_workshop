import { HttpException, Injectable } from '@nestjs/common';
import { Storage } from '../storage/storage';
import { generateUuid } from '../utils/utils';
import { AuthStorage } from '../storage/auth.storage';

@Injectable()
export class AuthService {

  constructor(
    private readonly storage: Storage,
    private readonly authStorage: AuthStorage,
  ) {
  }

  register(dto: {
    login: string,
    password: string,
  }) {
    let data = this.storage.loadData();
    if (data.users.find(it => it.login == dto.login)) {
      throw new HttpException('User with specified [login] already exists', 400);
    }
    data.users.push({
      id: generateUuid(),
      login: dto.login,
      password: dto.password,
      firstName: null,
      lastName: null,
      description: null,
      followedUsers: [],
    });
    this.storage.commitData(data);
  }

  login(dto: {
    login: string,
    password: string,
  }): {
    accessToken: string
  } {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.login == dto.login);
    if (user == null) {
      throw new HttpException('User with specified [login] not found', 401);
    }
    if (user.password != dto.password) {
      throw new HttpException('Password is incorrect', 401);
    }
    let token = generateUuid();
    this.authStorage.saveToken(token, user.id);
    return {
      accessToken: token,
    };
  }

  authByToken(headers): string {
    if (!headers.hasOwnProperty('authorization')) {
      throw new HttpException('Unauthorized', 401);
    }
    let authorization: string = headers.authorization;
    if (authorization == null || typeof authorization != 'string') {
      throw new HttpException('Unauthorized', 401);
    }
    if (!authorization.startsWith('Token ')) {
      throw new HttpException('Unauthorized', 401);
    }
    let token = authorization.substring('Token '.length);
    let userId = this.authStorage.authByToken(token);
    if (userId == null) {
      throw new HttpException('Unauthorized', 401);
    }
    return userId;
  }

}
