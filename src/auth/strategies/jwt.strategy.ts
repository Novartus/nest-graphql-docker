import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/entities/user.entity';
import { JwtPayload } from 'src/utils/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const userData = await this.UserRepository.findOne({
        where: {
          id: payload.user_id,
          email: payload.email,
          deleted_at: IsNull(),
        },
      });

      if (!userData) {
        throw new UnauthorizedException('No user found !');
      } else {
        return userData;
      }
    } catch (error) {
      const message = 'Token error: ' + (error.message || error.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
