import { GetUsersParamDto } from '../dto/get-users-param.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import type { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // Injecting ConfigService
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser;
    // Check if user with email exists
    try{
        existingUser = await this.usersRepository.findOne({
          where: { email: createUserDto.email },
        });

    }catch(error){
      throw new RequestTimeoutException('Unable to process your request at moment',{
        description: ' Error connecting while DB'
      })
    }

    if(existingUser){
      throw new BadRequestException("The user already exists, please check your email");
    }


    /**
     * Handle exceptions if user exists later
     * */

    // Try to create a new user
    // - Handle Exceptions Later
    let newUser = this.usersRepository.create(createUserDto);
    try{
      newUser = await this.usersRepository.save(newUser);
    }catch(error){
      throw new RequestTimeoutException('Unable to process your request at moment',{
        description: ' Error connecting while DB'
      })
    }

    // Create the user
    return newUser;
  }

  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {
    throw new HttpException({
      status: HttpStatus.MOVED_PERMANENTLY,
      error:'API endpoint doesnot exist.',
      fileName: 'users.service.ts',
      lineNumber: 88
    },
    HttpStatus.MOVED_PERMANENTLY,
    {

    }
  )
  }

  /**
   * Public method used to find one user using the ID of the user
   */
  public async findOneById(id: number) {
    let user;
    try{
      user =  await this.usersRepository.findOneBy({id});
    }catch(error){
      throw new RequestTimeoutException("Request is taking too long, please try again")
    }

    if(user==null || user==undefined){
      throw new BadRequestException("No user is associated with this id")
    }

    return user;

  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}