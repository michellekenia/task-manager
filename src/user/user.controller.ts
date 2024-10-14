import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,  private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return { message: 'Usuário registrado com sucesso', user };
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
    return { message: 'Login realizado com sucesso', token };
  }
  
}
