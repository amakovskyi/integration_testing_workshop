import { Headers, Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { FollowersService } from '../services/followers.service';

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

  @Get('getFollowers')
  getFollowerForUser(
    @Headers() headers,
    @Query() query: { userId },
  ): {
    id: string,
    firstName: string,
    lastName: string,
    description: string,
  }[] {
    this.authService.authByToken(headers);
    return this.service.getFollowers(query.userId);
  }

  @Get('getMyFollowers')
  getMyFollowers(
    @Headers() headers,
  ): {
    id: string,
    firstName: string,
    lastName: string,
    description: string,
  }[] {
    let userId = this.authService.authByToken(headers);
    return this.service.getFollowers(userId);
  }

}
