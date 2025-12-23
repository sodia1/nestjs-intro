import { Body, Controller,Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  /*
   * GET localhost:3000/posts/:userId
   */
  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiResponse({ 
    status: 201, 
    description: 'The post has been successfully created.' 
  })
  @ApiOperation({ summary: 'Create a new post' })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) { 
    console.log(patchPostDto);
  }
}
