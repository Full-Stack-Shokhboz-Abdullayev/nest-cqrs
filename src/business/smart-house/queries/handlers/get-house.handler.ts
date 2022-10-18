import { Inject } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import {} from 'src/business/smart-house/events/impl/house-updated.event';
import { GetHouseQuery } from 'src/business/smart-house/queries/impl/get-house.query';
import { SmartHouseRepository } from 'src/business/smart-house/smart-house.repository';

@QueryHandler(GetHouseQuery)
export class GetHouseQueryHandler implements ICommandHandler<GetHouseQuery> {
  constructor(
    @Inject(SmartHouseRepository)
    private repository: SmartHouseRepository,
  ) {}

  async execute(query: GetHouseQuery) {
    const data = this.repository.getOne(query.params.houseId);

    return data;
  }
}
