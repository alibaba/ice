// Similar with nodejs's path.join, not a full version support.
export function join(...args) {
  return args.map((part, i) => {
    if (i === 0) {
      return part.trim().replace(/[\/]*$/g, '');
    } else {
      return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
    }
  }).filter(x => x.length).join('/');
}