import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field()
    categoryId: number;
}
