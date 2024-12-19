import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('UserInput')
@ObjectType('User')
class UserBase {
  @Field(() => ID)
  @IsString()
  id?: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNumber()
  monthlyIncome: number;

  @Field()
  @IsNumber()
  totalMoney: number;
}

@InputType()
export class CreateUserInput extends UserBase {
  @Field(() => ID, { nullable: true })
  id?: string;
}

@ObjectType()
export class UserObjectType extends UserBase {
  @Field(() => ID, { nullable: false })
  id: string;
}
