
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * Fork from https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/shallowEqual.js
 */
export default function is(x: any, y: any): boolean {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y; // eslint-disable-line no-self-compare
  }
}
