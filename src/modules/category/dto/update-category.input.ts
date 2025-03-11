import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
