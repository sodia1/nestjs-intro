import { Controller, 
    Get, 
    Post,
    Param,
    Put,
    Patch,
    Delete,
    Query, 
    Body, 
    ParseIntPipe, 
    ValidationPipe,
    DefaultValuePipe,
    Headers,
    Ip} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,
  ) {}

  @Get('{/:id}')
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiQuery({ name: 'limit', required: false, type: 'number', description: 'Limit number of users returned', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: 'number', description: 'Page number for pagination', example: 1 })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return 'You sent a post request to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}