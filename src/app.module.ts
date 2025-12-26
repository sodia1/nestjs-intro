import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [UsersModule,
    PostsModule,
    AuthModule, 
    TypeOrmModule.forRootAsync({
      imports: [],
      inject : [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [User,Post],
        autoLoadEntities: true,
        synchronize: true,
        username: 'postgres',
        password: 'Mail@1234',
        host: 'localhost',
        database: 'nestjs-blog',
        port: 5432,
      })
   }), 
   TagsModule, 
   MetaOptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
