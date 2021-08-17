import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { LoggedInUser } from 'src/shared/decorators/user';
import { UserEntity } from 'src/entities/user.entity';
import { User } from '../auth/graphql/auth.types';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@LoggedInUser() user: UserEntity) {
    return await this.usersService.whoami(user);
  }
}
