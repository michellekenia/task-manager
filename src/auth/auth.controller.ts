import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService,) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return {
        message: 'Usuário registrado com sucesso',
        user: { id: user.id, username: user.username },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );

    if (!user) {
      throw new HttpException(
        'Usuário ou senha incorretos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.authService.generateJwtToken(user);
    return {
      message: 'Login realizado com sucesso',
      token,
    };
  }
  
}
