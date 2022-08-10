import { Headers, Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { FollowersService } from '../services/followers.service';
import { UserProfile } from '../domain/user.post';

@Controller('followers')
export class FollowersController {

  constructor(
    private readonly authService: AuthService,
    private readonly service: FollowersService,
  ) {
  }

  @Post('follow')
  follow(
    @Headers() headers,
    @Body() body: { userId },
  ) {
    let userId = this.authService.authByToken(headers);
    this.service.followUser(userId, body.userId);
  }

  @Post('unfollow')
  unfollow(
    @Headers() headers,
    @Body() body: { userId },
  ) {
    let userId = this.authService.authByToken(headers);
    this.service.unfollowUser(userId, body.userId);
  }

  @Get('userFollowers')
  userFollowers(
    @Headers() headers,
    @Query() query: { userId },
  ): UserProfile[] {
    let userId = this.authService.authByToken(headers);
    return this.service.getFollowers(query.userId, userId);
  }

  @Get('myFollowers')
  myFollowers(
    @Headers() headers,
  ): UserProfile[] {
    let userId = this.authService.authByToken(headers);
    return this.service.getFollowers(userId, userId);
  }

  @Get('userFollowed')
  userFollowed(
    @Headers() headers,
    @Query() query: { userId },
  ): UserProfile[] {
    let userId = this.authService.authByToken(headers);
    return this.service.getFollowedUsers(query.userId, userId);
  }

  @Get('myFollowed')
  myFollowed(
    @Headers() headers,
  ): UserProfile[] {
    let userId = this.authService.authByToken(headers);
    return this.service.getFollowedUsers(userId, userId);
  }

}
