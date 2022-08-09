import { HttpException, Injectable } from '@nestjs/common';
import { Storage } from '../storage/storage';

@Injectable()
export class FollowersService {

  constructor(
    private readonly storage: Storage,
  ) {
  }

  followUser(userId: string, followUserId: string) {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == userId);
    user.followedUsers.push(followUserId);
    this.storage.commitData(data);
  }

  unfollowUser(userId: string, followUserId: string) {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == userId);
    let followedIndex = user.followedUsers.indexOf(followUserId);
    user.followedUsers.splice(followedIndex, 1);
    this.storage.commitData(data);
  }

  getFollowers(userId: string): {
    id: string,
    firstName: string,
    lastName: string,
    description: string,
  }[] {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == userId);
    let followedUsers = user.followedUsers.map(followedId => data.users.find(it => it.id == followedId));
    return followedUsers.map(it => {
      return {
        id: it.id,
        firstName: it.firstName,
        lastName: it.lastName,
        description: it.description,
      };
    });
  }

}