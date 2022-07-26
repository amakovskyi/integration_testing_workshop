import { Body, Controller, Get, Post } from '@nestjs/common';
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
