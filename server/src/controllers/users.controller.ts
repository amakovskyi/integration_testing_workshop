import { Headers, Body, Controller, Get, HttpException, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { UserProfile } from '../domain/user.post';

@Controller('users')
export class UsersController {

  constructor(
    private readonly authService: AuthService,
    private readonly service: UsersService,
  ) {
  }

  @Get('me')
  me(
    @Headers() headers,
  ): {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    description: string,
  } {
    let userId = this.authService.authByToken(headers);
    let info = this.service.getUserInfoById(userId, userId);
    return {
      id: info.id,
      login: info.login,
      firstName: info.firstName,
      lastName: info.lastName,
      description: info.description,
    };
  }

  @Post('updateMyProfile')
  register(
    @Headers() headers,
    @Body() body: {
      firstName: string,
      lastName: string,
      description: string,
    },
  ) {
    let userId = this.authService.authByToken(headers);
    return this.service.updateUserInfoById(userId, body);
  }

  @Get('getProfile')
  getProfile(
    @Headers() headers,
    @Query() query: { id },
  ): UserProfile {
    let userId = this.authService.authByToken(headers);
    let info = this.service.getUserInfoById(userId, query.id);
    return {
      id: info.id,
      firstName: info.firstName,
      lastName: info.lastName,
      description: info.description,
      isFollowed: info.isFollowed,
    };
  }

  @Get('list')
  list(
    @Headers() headers,
    @Query() query: { query, count, offset },
  ): {
    total: number,
    items: UserProfile[]
  } {
    let userId = this.authService.authByToken(headers);
    return this.service.list(userId, query.query, query.count, query.offset);
  }

}
