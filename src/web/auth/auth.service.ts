import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Request } from 'express';
import { JwtPayload } from 'src/shared/interfaces';
import { UserLoginInputDto, UserSignUpInputDto } from 'src/dto/auth.dto';
import { UserEntity } from 'src/entities/user.entity';
import { SignIn, User } from './graphql/auth.types';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async facebookLogin(req: Request) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  async googleLogin(req: Request) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  async signUp(data: UserSignUpInputDto): Promise<User> {
    try {
      const userData = await this.UserRepository.findOne({
        where: { email: data.email, deleted_at: IsNull() },
      });

      if (userData) {
        throw new ConflictException('User with given email already exists');
      }

      const user = new UserEntity();
      user.name = data.name;
      user.email = data.email;

      if (data.confirm_password === data.password) {
        user.password = await AuthHelper.hash(data.password);
        await user.save();
      } else {
        throw new BadRequestException('Password does not match');
      }
      return user;
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(data: UserLoginInputDto): Promise<SignIn> {
    try {
      const userData = await this.UserRepository.findOne({
        where: { email: data.email, deleted_at: IsNull() },
      });

      if (!userData) {
        throw new BadRequestException('No user found with given email');
      }

      const validCredentials = await AuthHelper.validate(
        data.password,
        userData.password,
      );

      if (validCredentials) {
        const payload: JwtPayload = {
          user_id: userData.id,
          email: userData.email,
        };
        const access_token = this.jwtService.sign(payload);
        return {
          access_token: access_token,
          user: userData,
        };
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
