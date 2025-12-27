import { CreatePostDto } from '../dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { MetaOptionsService } from './../../meta-options/meta-options.service';
import { UsersService } from '../../users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Injecting postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Create the post
    let postEntity = new Post();
    postEntity.title = createPostDto.title;
    postEntity.content = createPostDto.content;
    postEntity.slug = createPostDto.slug;
    postEntity.postType = createPostDto.postType;
    postEntity.status = createPostDto.status;
    let post = this.postsRepository.create();

    return await this.postsRepository.save(post);
  }

  /**
   * Method to find all posts
   */
  public async findAll(userId: string) {
    // find all posts
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }

  /**
   * Method to delete a post from the database
   */
  public async delete(id: number) {
    // Find the post from the database
    let post = await this.postsRepository.findOneBy({ id });

    // Delete metaOptions and the post
    await this.postsRepository.delete(id);
    if(post?.metaOptions)
      await this.metaOptionsRepository.delete(post.metaOptions.id);

    return { deleted: true, id: post?.id };
  }
}