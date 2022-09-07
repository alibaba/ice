const path = require('path');

module.exports = function (config, options) {
  return {
    name: 'docusaurus-redirect-plugin',
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;

      const routes = [
        // {
        //   from: '/docs/guide/advance/fusion',
        //   to: '/docs/plugin/list/fusion',
        // },
        // {
        //   from: '/docs/guide/advance/antd',
        //   to: '/docs/plugin/list/antd',
        // },
        // {
        //   from: '/docs/guide/develop/plugin-dev',
        //   to: '/docs/plugin/develop/start',
        // },
        // {
        //   from: '/docs/guide/develop/plugin-build',
        //   to: '/docs/plugin/develop/build',
        // },
        // {
        //   from: '/docs/guide/develop/plugin-runtime',
        //   to: '/docs/plugin/develop/runtime',
        // },
        // {
        //   from: '/docs/guide/develop/plugin-list',
        //   to: '/docs/plugin/list/moment-locales',
        // },
        // {
        //   from: '/docs/guide/basic/api',
        //   to: '/docs/config/about',
        // },
      ];

      const redirectConfigPath = await createData(
        'redirectConfig.json',
        JSON.stringify(routes),
      );

      routes.forEach((item) => {
        addRoute({
          path: item.from,
          component: '@site/src/components/Redirect',
          modules: {
            // propName -> JSON file path
            redirectConfig: redirectConfigPath,
          },
          exact: true,
        });
      });

      addRoute({
        path: path.join(config.baseUrl, '/component'),
        component: '@site/src/components/Redirect',
        modules: {
          // propName -> JSON file path
          redirectConfig: redirectConfigPath,
        },
      });

      addRoute({
        path: path.join(config.baseUrl, '/docs/guide/advance'),
        component: '@site/src/components/Redirect',
        modules: {
          // propName -> JSON file path
          redirectConfig: redirectConfigPath,
        },
      });

      addRoute({
        path: path.join(config.baseUrl, '/docs/materials'),
        component: '@site/src/components/Redirect',
        modules: {
          // propName -> JSON file path
          redirectConfig: redirectConfigPath,
        },
      });

      addRoute({
        path: path.join(config.baseUrl, '/docs/icestark'),
        component: '@site/src/components/Redirect',
        modules: {
          // propName -> JSON file path
          redirectConfig: redirectConfigPath,
        },
      });
    },
  };
};