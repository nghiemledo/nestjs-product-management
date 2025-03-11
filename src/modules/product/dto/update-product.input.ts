import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field()
    categoryId: number;
}
