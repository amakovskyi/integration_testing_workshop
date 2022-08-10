import { HttpException, Injectable } from '@nestjs/common';
import { Storage } from '../storage/storage';
import { generateUuid } from '../utils/utils';
import { UserPost } from '../domain/user.post';
import { of } from 'rxjs';
import { Data, PostData } from '../storage/data';

@Injectable()
export class PostsService {

  constructor(
    private readonly storage: Storage,
  ) {
  }

  createPost(post: {
    authorId: string,
    text: string
  }): string {
    let data = this.storage.loadData();
    let id = generateUuid();
    data.posts.push({
      id,
      authorId: post.authorId,
      text: post.text,
    });
    this.storage.commitData(data);
    return id;
  }

  deletePost(userId: string, postId: string) {
    let data = this.storage.loadData();
    let index = data.posts.findIndex(it => it.id == postId);
    if (data.posts[index].authorId != userId) {
      throw new Error('User is not post author');
    }
    data.posts.splice(index, 1);
    this.storage.commitData(data);
  }

  private loadPost(data: Data, post: PostData): UserPost {
    let author = data.users.find(it => it.id == post.authorId);
    return {
      id: post.id,
      text: post.text,
      author: {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
      },
    };
  }

  getUserPosts(userId: string, count: number, offset: number): {
    total: number,
    items: UserPost[]
  } {
    let data = this.storage.loadData();
    let list = data.posts.filter(it => it.authorId == userId).reverse();
    return {
      total: list.length,
      items: list.splice(offset, count).map(it => this.loadPost(data, it)),
    };
  }

  getUserFeed(userId: string, count: number, offset: number): {
    total: number,
    items: UserPost[]
  } {
    let data = this.storage.loadData();
    let user = data.users.find(it => it.id == userId);
    let list = data.posts.filter(it => user.followedUsers.includes(it.authorId)).reverse();
    return {
      total: list.length,
      items: list.splice(offset, count).map(it => this.loadPost(data, it)),
    };
  }

}
