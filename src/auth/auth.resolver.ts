import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSignUpInputDto } from 'src/dto/input/auth.dto';
import { AuthService } from './auth.service';
import { User } from './model/auth';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello Auth!';
  }

  @Mutation(() => User)
  async signUpUser(@Args('data') argData: UserSignUpInputDto): Promise<User> {
    return await this.authService.signUp(argData);
  }
}
