import { Body, Controller, Get, Headers, HttpException, Injectable, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { UserPost } from '../domain/user.post';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly authService: AuthService,
    private readonly service: PostsService,
  ) {
  }

  @Post('createPost')
  createPost(
    @Headers() headers,
    @Body() body: { text },
  ): string {
    let userId = this.authService.authByToken(headers);
    return this.service.createPost({
      authorId: userId,
      text: body.text,
    });
  }

  @Post('deletePost')
  deletePost(
    @Headers() headers,
    @Body() body: { id },
  ) {
    let userId = this.authService.authByToken(headers);
    this.service.deletePost(userId, body.id);
  }

  @Get('myPosts')
  myPosts(
    @Headers() headers,
    @Query() body: { count, offset },
  ): {
    total: number,
    items: UserPost[]
  } {
    let userId = this.authService.authByToken(headers);
    return this.service.getUserPosts(userId, body.count, body.offset);
  }

  @Get('userPosts')
  userPosts(
    @Headers() headers,
    @Query() body: { userId, count, offset },
  ): {
    total: number,
    items: UserPost[]
  } {
    this.authService.authByToken(headers);
    return this.service.getUserPosts(body.userId, body.count, body.offset);
  }

  @Get('feed')
  feed(
    @Headers() headers,
    @Query() body: { count, offset },
  ): {
    total: number,
    items: UserPost[]
  } {
    let userId = this.authService.authByToken(headers);
    return this.service.getUserFeed(userId, body.count, body.offset);
  }

}
