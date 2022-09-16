// Similar with nodejs's path.join, not a full version support.
const separator = '/';

export function join(...args) {
  const replace = new RegExp(`${separator}{1,}`, 'g');
  return args.join(separator).replace(replace, separator);
}
