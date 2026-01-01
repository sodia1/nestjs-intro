import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject TagsService
     */
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author: any;
    let tags: any;

    try {
      // Find author from database based on authorId
      author = await this.usersService.findOneById(user.sub);
      // Find tags
      tags = await this.tagsService.findMultipleTags(createPostDto.tags ?? []);
    } catch (error) {
      throw new ConflictException(error);
    }

    if ((createPostDto.tags ?? []).length !== tags.length) {
      throw new BadRequestException('Please check your tag Ids');
    }

    let post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.status = createPostDto.status;
    post.postType = createPostDto.postType ;
    post.slug = createPostDto.slug ;
    post.featuredImageUrl =createPostDto.featuredImageUrl ;
    post.publishOn = createPostDto.publishOn;
    post.author = author;
    post.tags = tags

    // Assign the new tags
    post.tags = tags;

    // Create post
    this.postsRepository.create(post);

    try {
      // return the post
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}