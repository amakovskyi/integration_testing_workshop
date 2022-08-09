import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthService } from './services/auth.service';
import { AuthStorage } from './storage/auth.storage';
import { Storage } from './storage/storage';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { FollowersService } from './services/followers.service';
import { FollowersController } from './controllers/followers.controller';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    FollowersController,
    PostsController,
  ],
  providers: [
    AuthStorage,
    Storage,
    AuthService,
    UsersService,
    FollowersService,
    PostsService,
  ],
})
export class AppModule {
}
