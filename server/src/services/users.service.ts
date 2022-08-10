import { HttpException, Injectable } from '@nestjs/common';
import { Storage } from '../storage/storage';
import { of } from 'rxjs';
import { UserProfile } from '../domain/user.post';

@Injectable()
export class UsersService {

  constructor(
    private readonly storage: Storage,
  ) {
  }

  getUserInfoById(callerId: string, id: string): {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    description: string,
    isFollowed: boolean,
  } {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == id);
    let caller = data.users.find(it => it.id == callerId);
    if (user == null) {
      throw new HttpException('User does not exists', 400);
    }
    return {
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
      isFollowed: caller.followedUsers.includes(id),
    };
  }

  updateUserInfoById(
    id: string,
    info: {
      firstName: string,
      lastName: string,
      description: string,
    },
  ) {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == id);
    if (user == null) {
      throw new HttpException('User does not exists', 400);
    }
    user.firstName = info.firstName;
    user.lastName = info.lastName;
    user.description = info.description;
    this.storage.commitData(data);
  }

  list(userId: string, query: string, count: number, offset: number): {
    total: number,
    items: UserProfile[]
  } {
    let data = this.storage.loadData();
    let users = data.users;
    let currentUser = data.users.find(it => it.id == userId);
    if (query != null && query.length > 0) {
      users = users.filter(it => it.firstName?.startsWith(query) || it.lastName?.startsWith(query));
    }
    return {
      total: users.length,
      items: users.splice(offset, count).map(it => {
        return {
          id: it.id,
          firstName: it.firstName,
          lastName: it.lastName,
          description: it.description,
          isFollowed: currentUser.followedUsers.includes(it.id),
        };
      }),
    };
  }

}