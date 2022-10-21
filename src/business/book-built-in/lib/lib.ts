// // const methods: Array<DiscoveredMethodWithMeta<string>> =
//     //   await this.findFromControllersAndProviders(NEST_EVENT_ON);

//     // methods.forEach((m: DiscoveredMethodWithMeta<string>) => {
//     //   const eventName: string = m.meta;
//     //   const discoveredClass: DiscoveredClass = m.discoveredMethod.parentClass;
//     //   const methodName: string = m.discoveredMethod.methodName;
//     //   const methodKey = `${discoveredClass.name}.${methodName}`;
//     //   const method: any = discoveredClass.instance[methodName].bind(
//     //     discoveredClass.instance,
//     //   );

//     //   if (!handlers[eventName]) {
//     //     handlers[eventName] = method;
//     //   }
//     // });

//     const metadata: {
//         meta: {
//           repository: any;
//           consumer: any;
//         };
//       }[] = (await this.discovery.providersWithMetaAtKey<string>(
//         NEST_EVENT_CONSUMER_FOR,
//       )) as any;
//       // console.log(metadata);

//       metadata.forEach(async ({ meta: { consumer, repository } }) => {
//         const methods = Reflect.getOwnMetadataKeys(consumer.prototype).map(
//           (key) => {
//             const [_, __, ...method] = key.split(':');
//             return method.join(':');
//           },
//         );

//         methods.forEach(async (methodName) => {
//           const handler: any = consumer.prototype[methodName.split(':')[1]];

//           if (!handlers[methodName]) {
//             handlers[methodName] = handler;
//           }

//           const {
//             discoveredClass: { instance, injectType },
//           }: DiscoveredClassWithMeta<string> = (
//             await this.discovery.providersWithMetaAtKey<string>(
//               NEST_EVENT_EMITTER,
//             )
//           ).find(
//             ({ discoveredClass: { injectType } }) => injectType === repository,
//           );

//           Object.getOwnPropertyNames(injectType.prototype).forEach(
//             (_methodName: string) => {
//               if (_methodName === 'constructor') return;

//               const original = instance[_methodName];
//               console.log(_methodName);

//               const func = async function (...args: any[]) {
//                 const res = await Promise.resolve(original(...args));

//                 try {
//                   return res;
//                 } finally {
//                   // if (handlers[methodName]) handlers[methodName](res);
//                   if (handlers[methodName]) handlers[methodName](res);
//                 }
//               };

//               instance[_methodName] = func;
//             },
//           );
//         });
//       });
