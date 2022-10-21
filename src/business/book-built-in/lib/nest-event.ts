import {
  NEST_EVENT_ON,
  NEST_EVENT_EMITTER,
  NEST_EVENT_FROM,
  NEST_EVENT_CONSUMER_FOR,
} from './constants';
import { EventEmitter } from 'events';
import {
  DiscoveryService,
  DiscoveredClassWithMeta,
  DiscoveredMethodWithMeta,
  DiscoveredClass,
} from '@nestjs-plus/discovery';
import { Injectable } from '@nestjs/common';
import { BookConsumer } from 'src/business/book/book.consumer';

const handlers: Record<string, (...args: any) => void> = {};

@Injectable()
export class NestEvent {
  private emitters: Map<string, EventEmitter>;
  constructor(private readonly discovery: DiscoveryService) {}

  public async configure() {
    this.emitters = await this.findEmitters();
    await this.setEventListeners();
  }

  public getEmitters(): Map<string, EventEmitter> {
    return this.emitters;
  }

  private async findEmitters(): Promise<Map<string, EventEmitter>> {
    const discoveredEmitters: Array<DiscoveredClassWithMeta<string>> =
      await this.discovery.providersWithMetaAtKey<string>(NEST_EVENT_EMITTER);

    const defaultEmitter: DiscoveredClassWithMeta<string> =
      discoveredEmitters.find(
        (item: DiscoveredClassWithMeta<string>) => item.meta === 'default',
      );
    const emitters: Map<string, EventEmitter> = new Map<string, EventEmitter>(
      discoveredEmitters.map((item: DiscoveredClassWithMeta<string>) => [
        item.meta,
        item.discoveredClass.instance as EventEmitter,
      ]),
    );
    if (!defaultEmitter) {
      emitters.set('default', new EventEmitter());
    }

    return emitters;
  }

  private async getMethodEmitters(): Promise<Map<string, EventEmitter>> {
    const methodEmitters: Array<DiscoveredMethodWithMeta<string>> =
      await this.findFromControllersAndProviders(NEST_EVENT_FROM);

    return new Map<string, EventEmitter>(
      methodEmitters.map((m: DiscoveredMethodWithMeta<string>) => [
        `${m.discoveredMethod.parentClass.name}.${m.discoveredMethod.methodName}`,
        this.emitters.get(m.meta),
      ]),
    );
  }

  private async setEventListeners() {
    const methodEmitters: Map<string, EventEmitter> =
      await this.getMethodEmitters();
    const methods: Array<DiscoveredMethodWithMeta<string>> =
      await this.findFromControllersAndProviders(NEST_EVENT_ON);

    methods.forEach((m: DiscoveredMethodWithMeta<string>) => {
      const eventName: string = m.meta;
      const discoveredClass: DiscoveredClass = m.discoveredMethod.parentClass;
      const methodName: string = m.discoveredMethod.methodName;
      const methodKey = `${discoveredClass.name}.${methodName}`;
      const method: any = discoveredClass.instance[methodName].bind(
        discoveredClass.instance,
      );
      if (methodEmitters.has(methodKey)) {
        const emiterInstance: EventEmitter | undefined =
          methodEmitters.get(methodKey);
        if (emiterInstance) {
          handlers[eventName] = method;
        }

        return;
      }
      const emitter: EventEmitter | undefined = this.emitters.get('default');

      if (emitter) {
        handlers[eventName] = method;
      }
    });

    const discoveredEmitters: Array<DiscoveredClassWithMeta<string>> =
      await this.discovery.providersWithMetaAtKey<string>(NEST_EVENT_EMITTER);

    discoveredEmitters.forEach(
      ({ discoveredClass: { instance, injectType } }) => {
        Object.getOwnPropertyNames(injectType.prototype).forEach(
          (methodName: string) => {
            if (methodName === 'constructor') return;
            const original = instance[methodName];

            const func = function (...args: any[]) {
              Promise.resolve(original(...args)).then((...res) => {
                handlers[methodName](...res);
              });
            };

            instance[methodName] = func;
          },
        );
      },
    );
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

@Injectable()
export class NestEvent2 {
  constructor(private readonly discovery: DiscoveryService) {}

  public async configure() {
    await this.setEventListeners();
  }

  private async setEventListeners() {
    const methods: Array<DiscoveredMethodWithMeta<string>> =
      await this.findFromControllersAndProviders(NEST_EVENT_ON);

    methods.forEach((m: DiscoveredMethodWithMeta<string>) => {
      const eventName: string = m.meta;
      const discoveredClass: DiscoveredClass = m.discoveredMethod.parentClass;
      const methodName: string = m.discoveredMethod.methodName;
      const methodKey = `${discoveredClass.name}.${methodName}`;
      const method: any = discoveredClass.instance[methodName].bind(
        discoveredClass.instance,
      );

      if (!handlers[eventName]) {
        handlers[eventName] = method;
      }
    });

    const discoveredEmitters: Array<DiscoveredClassWithMeta<string>> =
      await this.discovery.providersWithMetaAtKey<string>(NEST_EVENT_EMITTER);

    discoveredEmitters.forEach(
      ({ discoveredClass: { instance, injectType } }) => {
        Object.getOwnPropertyNames(injectType.prototype).forEach(
          (methodName: string) => {
            if (methodName === 'constructor') return;

            const original = instance[methodName];

            const func = async function (...args: any[]) {
              const res = await Promise.resolve(original(...args));

              try {
                return res;
              } finally {
                if (handlers[methodName]) handlers[methodName](res);
              }
            };

            instance[methodName] = func;
          },
        );
      },
    );
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
