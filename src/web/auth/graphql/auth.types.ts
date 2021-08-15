import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field({ nullable: true })
  deleted_at?: Date;
}

@ObjectType()
export class SignIn {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
