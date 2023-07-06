function proxyData(data: any) {
  if (typeof Proxy === 'function') {
    const errorMessage = 'Do not mutate suspense data directly, it will cause unexpected behavior.';
    const handler: ProxyHandler<any> = {
      deleteProperty(target, prop) {
        console.error(errorMessage);
        delete target[prop];
        return true;
      },
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'object' && value !== null) {
          return new Proxy(value, handler);
        }
        return value;
      },
      set(target, prop, value, receiver) {
        if (prop === 'length' && Array.isArray(target)) {
          if (value < target.length) {
            console.error(errorMessage, `Popping value "${target[target.length - 1]}" from array`);
          } else {
            console.error(errorMessage, `Pushing value "${value}" to array`);
          }
        } else {
          console.error(errorMessage, `Setting property "${String(prop)}" to "${value}"`);
        }
        Reflect.set(target, prop, value, receiver);
        return true;
      },
    };
    return new Proxy(data, handler);
  } else {
    console.log('Recommend using the latest Chrome to debug suspense data.');
    return data;
  }
}

export default proxyData;
