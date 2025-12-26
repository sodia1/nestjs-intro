import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Class for users service
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // /** 
    //  * Injecting Auth Service
    //  */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    let user = this.userRepository.create(createUserDto);
    user =  await this.userRepository.save(user);
    return user
  }

  /** 
   * Method to find all the users
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /** 
   * Find a user by ID
   */
  public findOneById(id: number): Promise<any> {
    const user = this.userRepository.findOne({ where: { id } });
    if(!user) {
      throw new Error('User not found');
    }
    return user;
  }
}