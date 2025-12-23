import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';

/**
 * Class for users service
 */
@Injectable()
export class UsersService {
  constructor(
    /** 
     * Injecting Auth Service
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

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
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}