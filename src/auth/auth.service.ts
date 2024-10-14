import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private readonly userService: UserService) { }

    generateJwtToken(user: any) {
        const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
