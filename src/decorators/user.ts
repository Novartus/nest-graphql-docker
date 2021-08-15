import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      return ctx.getRequest().user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    }
  },
);
