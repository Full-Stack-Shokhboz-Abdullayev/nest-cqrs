export type ConsumerType<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any
    ? (payload: ReturnType<T[P]>) => any
    : T[keyof T];
};
