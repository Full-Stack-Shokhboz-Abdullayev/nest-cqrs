export class HouseEvent<T, E> {
  constructor(
    public params: {
      context: {
        message: string;
        flow: E;
      };
      data: T;
    },
  ) {}
}
