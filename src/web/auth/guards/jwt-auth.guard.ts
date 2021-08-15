import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<T extends UserEntity>(err: Error, user: T, info: Error): T {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          data: { ...info },
          error: err.message,
        })
      );
    }
    return user;
  }
}
