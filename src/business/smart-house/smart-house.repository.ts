import {
  CreateHouseInput,
  UpdateHouseInput,
} from 'src/business/smart-house/dto/mutation.dto';
import { Injectable } from '@nestjs/common';
import { HouseStateModel } from 'src/business/smart-house/dto/query.dto';
import { UserInputError } from 'apollo-server-express';

let uuid = 0;

type OmitProperty<T, K extends keyof T> = Omit<T, K>;

@Injectable()
export class SmartHouseRepository {
  state: Record<number, HouseStateModel> = {};
  private existanceCheck(houseId: number) {
    const house = this.state[houseId];

    if (!house) throw new UserInputError('No user found!');
  }

  update(houseId: number, value: OmitProperty<UpdateHouseInput, 'houseId'>) {
    this.existanceCheck(houseId);

    Object.keys(value).forEach((key) => {
      this.state[houseId][key] = value[key];
    });
    return this.state[houseId];
  }

  create(value: CreateHouseInput) {
    this.state[++uuid] = { ...value, id: uuid };
    return this.state[uuid];
  }

  get() {
    return Object.values(this.state);
  }

  getOne(houseId: number) {
    this.existanceCheck(houseId);

    return this.state[houseId];
  }

  delete(houseId: number) {
    this.existanceCheck(houseId);

    delete this.state[houseId];
    return true;
  }
}
