import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller()
export class AppController {

  constructor(private readonly authService: AuthService) {
  }

  @Get()
  getHello() {
    return 'Hello from test server!';
  }

  @Post('register')
  register(
    @Body() body: {
      login,
      password
    },
  ) {
    if (body.login.length == 0) {
      throw new HttpException('[login] cannot be empty', 400)
    }
    if (body.password.length == 0) {
      throw new HttpException('[password] cannot be empty', 400)
    }
    this.authService.register({
      login: body.login,
      password: body.password,
    });
  }

  @Post('login')
  login(
    @Body() body: {
      login,
      password
    },
  ): {
    accessToken: string
  } {
    let result = this.authService.login({
      login: body.login,
      password: body.password,
    });
    return {
      accessToken: result.accessToken,
    };
  }

}
