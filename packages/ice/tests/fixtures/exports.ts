//  @ts-nocheck
export const a = 1;
export function myFunc() {}
export class MyClass {}
const b = 2;
export { b as c, myFunc as anotherFunc };
export { foo } from './foo';
export { default as bar } from './bar';
export default 'hello';
export { baz as qux } from './baz';
export * as aaa from './aaa'