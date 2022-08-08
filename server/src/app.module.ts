import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthService } from './services/auth.service';
import { AuthStorage } from './storage/auth.storage';
import { Storage } from './storage/storage';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
  ],
  providers: [
    AuthStorage,
    Storage,
    AuthService,
    UsersService,
  ],
})
export class AppModule {
}
