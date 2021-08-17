import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const Authorization = request.get('Authorization');
    if (!Authorization) {
      new UnauthorizedException({
        status: 401,
      });
    }
    return super.canActivate(new ExecutionContextHost([request]));
  }

  handleRequest<T extends UserEntity>(err: Error, user: T, info: Error): T {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
