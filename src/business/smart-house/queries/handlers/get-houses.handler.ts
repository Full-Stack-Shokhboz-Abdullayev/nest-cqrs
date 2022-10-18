import { Inject } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import {} from 'src/business/smart-house/events/impl/house-updated.event';
import { GetHousesQuery } from 'src/business/smart-house/queries/impl/get-houses.query';
import { SmartHouseRepository } from 'src/business/smart-house/smart-house.repository';

@QueryHandler(GetHousesQuery)
export class GetHousesQueryHandler implements ICommandHandler<GetHousesQuery> {
  constructor(
    @Inject(SmartHouseRepository)
    private repository: SmartHouseRepository,
  ) {}

  async execute() {
    const data = this.repository.get();

    return data;
  }
}
