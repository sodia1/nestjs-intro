import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}
}
