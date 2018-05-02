import Vue from 'vue';
import Router from 'vue-router';
import routesConfig from './routesConfig';

/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
const recursiveRoutesConfig = (config = [], componentType) => {
  const routeMap = [];
  config.forEach((item) => {
    const route = {
      path: item.path,
      component: item[componentType],
      redirect: item.redirect,
    };
    if (Array.isArray(item.children)) {
      route.children = recursiveRoutesConfig(item.children, 'component');
    }
    routeMap.push(route);
  });

  return routeMap;
};

const routes = recursiveRoutesConfig(routesConfig, 'layout');

Vue.use(Router);

export default new Router({
  routes,
});
