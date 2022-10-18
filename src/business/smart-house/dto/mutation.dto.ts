import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateHouseInput {
  @Field(() => Int)
  houseId: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  water?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  gas?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  electricity?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  fireplace?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  cameras?: boolean;
}

@InputType()
export class CreateHouseInput {
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
export class DeleteHouseInput {
  @Field(() => Int)
  houseId: number;
}

@ObjectType()
export class SuccessModel {
  @Field(() => Boolean)
  success: boolean;
}
