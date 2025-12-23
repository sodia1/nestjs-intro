import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
