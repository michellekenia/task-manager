import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService) { }

  
    async findById(id: number): Promise<User|null> {
      return this.prisma.user.findUnique({
        where: { id: id },
      });
    }
 
  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }
}
