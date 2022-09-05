import { registrationNameToReactEvent } from './events';

export default function transformPrototypes(props: Object): Object {
  const resProps: Object = {};
  Object.keys(props).forEach((propKey: string) => {
    let resKey: string = propKey;
    let resValue: string = props[propKey];
    // Transform the event so that it works properly in React.
    // ontouchstart can work in rax, but react will check event in event plugin.
    // Rax compat should transform event which can work in rax runtime.
    // React support onDoubleClick but dblclick event is web Standards events.
    // etc...
    if (propKey.startsWith('on')) {
      const lowerCasedPropkey: string = propKey.toLowerCase();
      if (registrationNameToReactEvent.has(lowerCasedPropkey)) {
        const reactEvent: string = registrationNameToReactEvent.get(lowerCasedPropkey);
        if (reactEvent !== propKey) {
          resKey = reactEvent;
        }
      }
    }

    resProps[resKey] = resValue;
  });

  return resProps;
}
