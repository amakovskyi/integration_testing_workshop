import { HttpException, Injectable } from '@nestjs/common';
import { Storage } from '../storage/storage';
import { UserProfile } from '../domain/user.post';

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

  getFollowers(userId: string, callerId: string): UserProfile[] {
    let data = this.storage.loadData();
    let caller = data.users.find(it => it.id == callerId);
    let followers = data.users.filter(it => it.followedUsers.includes(userId));
    return followers.map(it => {
      return {
        id: it.id,
        firstName: it.firstName,
        lastName: it.lastName,
        description: it.description,
        isFollowed: caller.followedUsers.includes(it.id),
      };
    });
  }

  getFollowedUsers(userId: string, callerId: string): UserProfile[] {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == userId);
    let caller = data.users.find(it => it.id == callerId);
    let followedUsers = user.followedUsers.map(followedId => data.users.find(it => it.id == followedId));
    return followedUsers.map(it => {
      return {
        id: it.id,
        firstName: it.firstName,
        lastName: it.lastName,
        description: it.description,
        isFollowed: caller.followedUsers.includes(it.id),
      };
    });
  }

}