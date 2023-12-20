import fse from 'fs-extra';

// Remove `use client` directive for Client Component
// to rendering rsc result by ssr.
const transformRscDirective = () => {
  return {
    name: 'transform-rsc-directive',
    resolveId(id) {
      if (id.indexOf('(rsc)') > -1) {
        const newId = id.replace('(rsc)', '');
        return {
          id: newId,
          namespace: 'rsc',
        };
      }
    },
    async load(id, namespace) {
      if (namespace === 'rsc') {
        let source = await fse.readFile(id, 'utf-8');
        if (source.indexOf("'use client';") === 0) {
          const code = source.replace("'use client';", '');
          return code;
        }
      }
    },
  };
};

export default transformRscDirective;