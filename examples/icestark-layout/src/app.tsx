import { defineAppConfig } from 'ice';
import { defineFrameworkConfig } from '@ice/plugin-icestark/types';
import FrameworkLayout from '@/components/FrameworkLayout';

export const icestark = defineFrameworkConfig(() => ({
  layout: FrameworkLayout,
  getApps: () => ([{
    path: '/seller',
    title: '商家平台',
    loadScriptMode: 'import',
    entry: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-ice-vite/index.html',
  }, {
    path: '/waiter',
    title: '小二平台',
    loadScriptMode: 'import',
    entry: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-vue3-vite/index.html',
  }]),
}));

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
}));
