import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HouseStateModel {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  water: boolean;

  @Field(() => Boolean)
  gas: boolean;

  @Field(() => Boolean)
  electricity: boolean;

  @Field(() => Boolean)
  fireplace: boolean;

  @Field(() => Boolean)
  cameras: boolean;
}

@InputType()
export class GetHouseInput {
  @Field(() => Int)
  houseId: number;
}
