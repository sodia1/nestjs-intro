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

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * 
     * Final Endpoint: /users/:id?limit=10&page=1
     * Param id - optional, convert to int, cannot have a default value
     * Query limit - integer, default value 10
     * Query page - integer, default value 1
     * 
     * ===> 
     * Use case:
     * /users/ --> return all users with default limit and page
     * /users/5 --> return user with id 5 with default limit and page
     * /users?limit=20&page=2 --> return user with id 5 with limit 20 and page 2
     */

    @Get('{/:id}')
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto, 
        @Query('limit',new DefaultValuePipe(10) ,ParseIntPipe) limit:any,
        @Query('page',new DefaultValuePipe(1) ,ParseIntPipe) page:any
    ) {
        console.log(getUsersParamDto);
        return 'You sent a request to get all users';
    }

    @Post()
    public createUser(
        @Body() createUserDto: CreateUserDto,
        @Headers() header: any,
        @Ip() ip: string
    ) {
        console.log(createUserDto);
        console.log(typeof createUserDto);
        console.log(createUserDto instanceof CreateUserDto);
        return 'You sent a request to create a user';
    }

    @Patch()
    public updateUser(
        @Body() patchUserDto: PatchUserDto
    ) {
        return 'You sent a request to update a user';
    }
}
