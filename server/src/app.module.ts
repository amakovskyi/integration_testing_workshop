import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthService } from './services/auth.service';
import { AuthStorage } from './storage/auth.storage';
import { Storage } from './storage/storage';

@Module({
  imports: [],
  controllers: [
    AppController,
  ],
  providers: [
    AuthStorage,
    Storage,
    AuthService,
  ],
})
export class AppModule {
}
