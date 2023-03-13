const routes = [
  {
    path: 'rewrite',
    // 从 src/page 开始计算路径，并且需要写后缀
    component: 'sales/layout.tsx',
    children: [
      {
        // Test the legacy logic. It is not recommended to add slash for children path.
        path: '/favorites',
        component: 'sales/favorites.tsx',
      },
      {
        path: 'overview',
        component: 'sales/overview.tsx',
      },
      {
        path: 'recommends',
        component: 'sales/recommends.tsx',
      },
    ],
  },
  {
    path: '/',
    component: 'index.tsx',
  },
];
export default routes;
