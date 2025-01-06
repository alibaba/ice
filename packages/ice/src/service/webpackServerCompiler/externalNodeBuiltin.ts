import { createUnplugin } from 'unplugin';
import { isNodeBuiltin } from 'mlly';

export const unpluginFactory = (options) => [
  {
    name: 'external-node-builtin',
    resolveId(id) {
      if (isNodeBuiltin(id)) {
        return { id, external: true };
      }
      return null;
    },
  },
];

export const externalNodeBuiltin = /* #__PURE__ */ createUnplugin(unpluginFactory);
