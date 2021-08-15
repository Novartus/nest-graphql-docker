import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEmail,
  MaxLength,
  Matches,
  IsString,
} from 'class-validator';

@InputType()
export class UserSignUpInputDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @Matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, {
    message: 'Please pick a string password',
  })
  password: string;

  @Field()
  @IsNotEmpty()
  @Matches(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, {
    message: 'Please pick a string password',
  })
  confirm_password: string;
}
