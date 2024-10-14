import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET, 
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy, UserService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
