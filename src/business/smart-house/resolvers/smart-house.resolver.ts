import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UpdateHouseCommand } from 'src/business/smart-house/commands/impl/update-house.command';
import {
  CreateHouseInput,
  DeleteHouseInput,
  SuccessModel,
  UpdateHouseInput,
} from 'src/business/smart-house/dto/mutation.dto';
import {
  GetHouseInput,
  HouseStateModel,
} from 'src/business/smart-house/dto/query.dto';
import { CreateHouseCommand } from 'src/business/smart-house/commands/impl/create-house.command';
import { DeleteHouseCommand } from 'src/business/smart-house/commands/impl/delete-house.command';
import { GetHousesQuery } from 'src/business/smart-house/queries/impl/get-houses.query';
import { GetHouseQuery } from 'src/business/smart-house/queries/impl/get-house.query';

@Resolver()
export class SmartHouseResolver {
  constructor(
    @Inject(CommandBus)
    private commandBus: CommandBus,

    @Inject(QueryBus)
    private queryBus: QueryBus,
  ) {}

  @Query(() => [HouseStateModel])
  getSmartHouses() {
    return this.queryBus.execute(new GetHousesQuery());
  }

  @Query(() => HouseStateModel)
  getSmartHouse(
    @Args({
      name: 'params',
      type: () => GetHouseInput,
    })
    params: GetHouseInput,
  ) {
    return this.queryBus.execute(new GetHouseQuery(params));
  }

  @Mutation(() => SuccessModel)
  deleteSmartHouse(
    @Args({
      name: 'params',
      type: () => DeleteHouseInput,
    })
    params: DeleteHouseInput,
  ) {
    return this.commandBus.execute(new DeleteHouseCommand(params));
  }

  @Mutation(() => HouseStateModel)
  createSmartHouse(
    @Args({
      name: 'params',
      type: () => CreateHouseInput,
    })
    params: CreateHouseInput,
  ) {
    return this.commandBus.execute(new CreateHouseCommand(params));
  }

  @Mutation(() => HouseStateModel)
  updateSmartHouse(
    @Args({
      name: 'params',
      type: () => UpdateHouseInput,
    })
    params: UpdateHouseInput,
  ) {
    return this.commandBus.execute(new UpdateHouseCommand(params));
  }
}
