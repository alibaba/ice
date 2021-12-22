import { redirectImport } from '@builder/app-helpers';
import { getOptions } from 'loader-utils';

export default function(code, sourcemap) {
  // Make the loader async
  const callback = this.async();
  this.cacheable();

  loader.call(this, code, sourcemap).then(
    args => callback(null, ...args),
    err => callback(err),
  );
}

async function loader(code, sourcemap) {
  const { framework, redirectEntries } = getOptions(this);
  code = await redirectImport(code, { source: framework, redirectImports: [
    {
      name: 'runApp',
      redirectPath: redirectEntries.find(({ entryPath }) => entryPath === this.resourcePath).runAppPath,
      default: false
    }
  ]});
  return [code, sourcemap];
}
