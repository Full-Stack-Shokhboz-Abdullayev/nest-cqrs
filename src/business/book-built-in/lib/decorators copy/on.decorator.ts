import { NEST_EVENT_ON } from '../constants';

export const CustomSetMetadata = <K = string, V = any>(
  metadataKey: K,
  metadataValue?: V,
): any => {
  const decoratorFactory = (target: any, key?: any) => {
    Reflect.defineMetadata(
      metadataKey + ':' + target.constructor.name + ':' + key,
      metadataValue || key,
      target,
    );

    return target;
  };

  decoratorFactory.KEY = metadataKey;
  return decoratorFactory;
};

export const On = () => CustomSetMetadata(NEST_EVENT_ON);
