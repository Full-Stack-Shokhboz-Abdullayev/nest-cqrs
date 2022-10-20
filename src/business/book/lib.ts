/* eslint-disable @typescript-eslint/ban-types */
import 'reflect-metadata';

const ee = new EventTarget();

const out: { [name: string]: any } = {};

const classDecoratorKey = Symbol.for('custom:Subscriber');

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr
    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

function After() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    let events: Array<(arg: any) => void> = Reflect.getMetadata(
      'events',
      target,
    );
    if (!events) {
      Reflect.defineMetadata('events', (events = []), target);
    }
    events.push((c: any) => {
      const domain = Reflect.getMetadata(classDecoratorKey, target);
      console.log(domain + ':' + propertyKey);

      ee.addEventListener(domain + ':' + propertyKey, () => {
        descriptor.value.call(c.prototype, out[domain + ':' + propertyKey]);
      });
    });

    return target;
  };
}

export function Consumer(cls: { new (): any }): ClassDecorator {
  return (constructor: any) => {
    Reflect.defineMetadata(classDecoratorKey, cls.name, constructor.prototype);
    const events: Array<(arg: any) => void> = Reflect.getMetadata(
      'events',
      constructor.prototype,
    );

    if (events) {
      events.forEach((fn) => fn(constructor));
    }
    return constructor;
  };
}

function Action() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = (...args: any[]) => {
      try {
        out[target.constructor.name + ':' + propertyKey] = method.call(
          target,
          ...args,
        );

        return out[target.constructor.name + ':' + propertyKey];
      } finally {
        ee.dispatchEvent(
          new Event(target.constructor.name + ':' + propertyKey),
        );
      }
    };
  };
}

type ConsumerType<T> = {
  [P in keyof T]: T[keyof T] extends (...args: any[]) => any
    ? (out: ReturnType<T[keyof T]>) => any
    : T[keyof T];
};

export { Action, After, ConsumerType };
