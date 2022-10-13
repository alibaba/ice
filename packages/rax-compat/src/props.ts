import { registrationNameToReactEvent } from './events';
import possibleStandardNames from './possible-standard-names';

function transformProps(props: Object): Object {
  const resProps: Object = {};
  Object.keys(props).forEach((propKey: string) => {
    let resKey: string = propKey;
    let resValue: string = props[propKey];
    const lowerCasedPropkey: string = propKey.toLowerCase();
    // Transform the event so that it works properly in React.
    // ontouchstart can work in rax, but react will check event in event plugin.
    // Rax compat should transform event which can work in rax runtime.
    // React support onDoubleClick but dblclick event is web Standards events.
    // etc...
    if (lowerCasedPropkey.startsWith('on')) {
      if (registrationNameToReactEvent.has(lowerCasedPropkey)) {
        const reactEvent: string = registrationNameToReactEvent.get(lowerCasedPropkey);
        if (reactEvent !== propKey) {
          resKey = reactEvent;
        }
      }
    } else if (Object.prototype.hasOwnProperty.call(possibleStandardNames, lowerCasedPropkey)) {
      // Transform the event so that it works properly in React.
      resKey = possibleStandardNames[lowerCasedPropkey];
    }

    resProps[resKey] = resValue;
  });

  return resProps;
}

export default transformProps;
