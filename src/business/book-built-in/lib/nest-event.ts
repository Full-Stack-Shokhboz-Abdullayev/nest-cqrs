import {
  NEST_EVENT_ON,
  NEST_EVENT_EMITTER,
  NEST_EVENT_CONSUMER_FOR,
} from './constants';
import {
  DiscoveryService,
  DiscoveredClassWithMeta,
  DiscoveredMethodWithMeta,
  DiscoveredClass,
} from '@nestjs-plus/discovery';
import { Injectable } from '@nestjs/common';

const handlers: Record<string, (...args: any) => void> = {};

@Injectable()
export class NestEvent {
  constructor(private readonly discovery: DiscoveryService) {}

  public async configure() {
    await this.setEventListeners();
  }

  private async setEventListeners() {
    const methods: Array<DiscoveredMethodWithMeta<string>> =
      await this.findFromControllersAndProviders(NEST_EVENT_ON);

    methods.forEach((m: DiscoveredMethodWithMeta<string>) => {
      const discoveredClass: DiscoveredClass = m.discoveredMethod.parentClass;
      const eventName: string = discoveredClass.name + ':' + m.meta;

      const methodName: string = m.discoveredMethod.methodName;
      const method: any = discoveredClass.instance[methodName].bind(
        discoveredClass.instance,
      );

      if (!handlers[eventName]) {
        handlers[eventName] = method;
      }
    });

    const consumers: Array<
      DiscoveredClassWithMeta<{ repository: any; consumer: any }>
    > = await this.discovery.providersWithMetaAtKey<{
      repository: any;
      consumer: any;
    }>(NEST_EVENT_CONSUMER_FOR);

    const repos: Array<DiscoveredClassWithMeta<string>> =
      await this.discovery.providersWithMetaAtKey<string>(NEST_EVENT_EMITTER);

    consumers.forEach(({ meta: { consumer, repository } }) => {
      const discoveryInfo = repos.find(
        ({ discoveredClass: { injectType } }) => injectType === repository,
      );

      if (discoveryInfo) {
        const {
          discoveredClass: { injectType, instance },
        } = discoveryInfo;

        Object.getOwnPropertyNames(injectType.prototype).forEach(
          (methodName: string) => {
            if (methodName === 'constructor') return;

            const eventName = consumer.name + ':' + methodName;

            const original = instance[methodName];

            const func = async function (...args: any[]) {
              const res = await Promise.resolve(original(...args));

              try {
                return res;
              } finally {
                if (handlers[eventName]) handlers[eventName](res);
              }
            };

            instance[methodName] = func;
          },
        );
      }
    });
  }

  private async findFromControllersAndProviders(
    metaKey: string,
  ): Promise<Array<DiscoveredMethodWithMeta<string>>> {
    const methodsFromControllers =
      await this.discovery.controllerMethodsWithMetaAtKey<string>(metaKey);
    const methodsFromProviders =
      await this.discovery.providerMethodsWithMetaAtKey<string>(metaKey);

    return [...methodsFromControllers, ...methodsFromProviders];
  }
}
