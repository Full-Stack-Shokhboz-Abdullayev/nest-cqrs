import { NEST_EVENT_ON } from '../constants';

export const CustomSetMetadata = <K = string>(metadataKey: K): any => {
  const decoratorFactory = (target: object, key?: any, descriptor?: any) => {
    Reflect.defineMetadata(metadataKey, key, descriptor.value);

    return target;
  };
  decoratorFactory.KEY = metadataKey;
  return decoratorFactory;
};
export const On = () => CustomSetMetadata(NEST_EVENT_ON);
