import type { FrameworkPlugin } from '@ice/service';

const plugin: FrameworkPlugin = ({ registerTask, context }) => {
  const { command } = context;
  const mode = command === 'start' ? 'development' : 'production';

  registerTask('web', {
    mode,
   });
};

export default plugin;