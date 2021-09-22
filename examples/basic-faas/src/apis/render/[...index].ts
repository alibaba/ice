import { useContext, useInject } from '@midwayjs/hooks';
import renderPage from '@ali/ice-faas-render';

// [...index].ts 匹配 HTTP /* 路径
export default async function render() {
  const ctx = useContext();
  const baseDir = await useInject('baseDir');

  await renderPage(ctx, {
    title: 'ICE & Midway Hooks',
    g_config: {},
    baseDir,
    favicon: 'https://img.alicdn.com/tfs/TB1.WE9xkL0gK0jSZFAXXcA9pXa-200-200.png',
  });
}
