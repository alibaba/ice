import fse from 'fs-extra';

// Transform Client Component for RSC.
const transformRsc = () => {
  return {
    name: 'transform-rsc',
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

export default transformRsc;