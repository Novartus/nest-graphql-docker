import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { FacebookStrategy } from './facebook.strategy';
// import { GoogleStrategy } from './google.strategy';
import { UserEntity } from 'src/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY,
      },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    //  GoogleStrategy, FacebookStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
