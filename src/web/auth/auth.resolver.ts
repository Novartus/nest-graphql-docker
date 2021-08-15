import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserLoginInputDto, UserSignUpInputDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { User, SignIn } from './graphql/auth.types';

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

  @Mutation(() => SignIn)
  async loginUser(@Args('data') argData: UserLoginInputDto): Promise<SignIn> {
    return await this.authService.login(argData);
  }
}
