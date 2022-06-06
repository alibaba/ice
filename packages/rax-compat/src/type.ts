export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export function isNull(obj: any): obj is null {
  return obj === null;
}
