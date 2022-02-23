import * as path from 'path';
import type { IFrameworkPlugin } from '@ice/service';

const plugin: IFrameworkPlugin = ({ registerTask, context }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';
  console.log(1231212312);

  const loaders = getBaseLoaders();
  // TODO: config types
  registerTask('web', {
    entry: path.join(rootDir, 'src/app.tsx'),
    mode,
    loaders,
   });
};

function getBaseLoaders() {
  return [
    {
      test: /\.(js|jsx|tsx)$/,
      use: [
        require.resolve('@builder/swc-loader'),
      ],
    },
  ];
}

export default plugin;
