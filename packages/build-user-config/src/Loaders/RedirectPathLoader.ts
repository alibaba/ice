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
  const options = getOptions(this);
  const sources = Object.keys(options);

  // eslint-disable-next-line no-restricted-syntax
  for (const source of sources) {
    const redirects = options[source];
    if (redirects) {
      // eslint-disable-next-line no-await-in-loop
      code = await redirectImport(code,
        {
          source,
          redirectImports: redirects
            .map((redirect) => {
              const { name, value, type, alias, multipleSource = [] } = redirect;
              const matchedSource = multipleSource.find(({ filename }) => filename === this.resourcePath);
              if (matchedSource) {
                return {
                  name,
                  redirectPath: matchedSource.value,
                  default: matchedSource.type === 'default',
                };
              }
              return {
                name,
                redirectPath: alias || value,
                default: type === 'default',
              };
            }),
        });
    }
  }

  return [code, sourcemap];
}
