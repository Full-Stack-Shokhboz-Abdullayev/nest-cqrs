import { NEST_EVENT_CONSUMER_FOR } from 'src/business/book-built-in/lib/constants';

const CustomSetMetadata = <K = string, V = any>(
  metadataKey: K,
  repository: V,
): any => {
  const decoratorFactory = (target: object) => {
    Reflect.defineMetadata(
      metadataKey,
      { repository: repository, consumer: target },
      target,
    );
    return target;
  };
  decoratorFactory.KEY = metadataKey;
  return decoratorFactory;
};

export const ConsumerFor = (cls: { new (): any }) =>
  CustomSetMetadata(NEST_EVENT_CONSUMER_FOR, cls);
