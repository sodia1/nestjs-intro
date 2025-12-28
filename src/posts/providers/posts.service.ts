import { PatchPostDto } from './../dto/patch-post.dto';
import { TagsService } from '../../tags/providers/tags.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { waitForDebugger } from 'inspector';
import { Tag } from 'src/tags/tag.entity';

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
     * Injecting Tags service
     */
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    // let author: User | null = await this.usersService.findOneById(createPostDto.authorId);
    // let tags: Tag[] = [];
    // if(createPostDto.tags!==undefined)
    //    tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // // Create the post
    // if(author!==null && tags!==undefined  ){
    //   let post: Post = this.postsRepository.create({
    //     ...createPostDto,
    //     author,
    //     tags: tags,
    //   });

    //   return await this.postsRepository.save(post);
    // }
  }

  /**
   * Method to find all posts
   */
  public async findAll(userId: string) {
    // find all posts
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        // tags: true,
      },
    });

    return posts;
  }

  /**
   * Method to delete a post from the database
   */
  public async delete(id: number) {
    // Find the post from the database
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }

  /**
   * Method to Update a post
   */
  public async update(patchPostDto: PatchPostDto) {
    // Find new tags
    if(!patchPostDto?.tags) {
      return;
    }
    let tags = await this.tagsService.findMultipleTags(patchPostDto?.tags);

    // Update the post
    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    // Update the tags
    if(post){
      post.tags = tags;

    return await this.postsRepository.save(post);
  }
  }
}