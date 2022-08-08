import { HttpException, Injectable } from '@nestjs/common';
import { Storage } from '../storage/storage';

@Injectable()
export class UsersService {

  constructor(
    private readonly storage: Storage,
  ) {
  }

  getUserInfoById(id: string): {
    id: string,
    login: string,
  } {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == id);
    if (user == null) {
      throw new HttpException('User does not exists', 400);
    }
    return {
      id: user.id,
      login: user.login,
    };
  }

}