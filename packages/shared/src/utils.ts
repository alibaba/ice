export const EMPTY_OBJ: any = {};

export const EMPTY_ARR = [];

export const noop = () => {};


export function toCamelCase(s: string) {
  let camel = '';
  let nextCap = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '-') {
      camel += nextCap ? s[i].toUpperCase() : s[i];
      nextCap = false;
    } else {
      nextCap = true;
    }
  }
  return camel;
}

export function toDashed(s: string) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export const toKebabCase = function (string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function indent(str: string, size: number): string {
  return str.split('\n')
    .map((line, index) => {
      const indent = index === 0 ? '' : Array(size).fill(' ').join('');
      return indent + line;
    })
    .join('\n');
}

/**
 * ensure takes a condition and throw a error if the condition fails,
 * like failure::ensure: https://docs.rs/failure/0.1.1/failure/macro.ensure.html
 * @param condition condition.
 * @param msg error message.
 */
 export function ensure(condition: boolean, msg: string): asserts condition {
  if (!condition) {
    if (process.env.NODE_ENV !== 'production') {
      const reportIssue = '\n如有疑问，请提交 issue 至：https://github.com/ice-lab/ice-next/issues';
      throw new Error(msg + reportIssue);
    } else {
      throw new Error(msg);
    }
  }
}

export function warn(condition: boolean, msg: string) {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      console.warn(`[ice miniapp warn] ${msg}`);
    }
  }
}

const { hasOwnProperty } = Object.prototype;

export const hasOwn = (
  val: Record<any, any>,
  key: string | symbol,
) => hasOwnProperty.call(val, key);
