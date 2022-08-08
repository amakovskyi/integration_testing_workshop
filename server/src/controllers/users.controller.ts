import { Headers, Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly authService: AuthService,
    private readonly service: UsersService,
  ) {
  }

  @Get('me')
  register(
    @Headers() headers,
  ): {
    id: string,
    login: string,
  } {
    let userId = this.authService.authByToken(headers);
    return this.service.getUserInfoById(userId);
  }

}
