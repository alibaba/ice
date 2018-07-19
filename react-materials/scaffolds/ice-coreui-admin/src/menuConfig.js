// 菜单配置
// defaultMenuConfig：脚手架默认侧边栏配置
// asideMenuConfig：自定义侧边导航配置

const defaultMenuConfig = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Theme',
      wrapper: {
        // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '', // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      path: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      path: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      path: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          path: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          path: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          path: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          path: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          path: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          path: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          path: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          path: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          path: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          path: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          path: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          path: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          path: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          path: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          path: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          path: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      path: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          path: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          path: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          path: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          path: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      path: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      path: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          path: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          path: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          path: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          path: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          path: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          path: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          path: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      path: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      path: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          path: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          path: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          path: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          path: '/500',
          icon: 'icon-star',
        },
      ],
    },
  ],
};

const asideMenuConfig = [];

/**
 * 转化 name 为 url
 * @param {Array} data
 */
function formatter(data) {
  return data.map((item) => {
    const result = {
      ...item,
      url: item.path,
    };
    if (item.children) {
      result.children = formatter(item.children);
    }
    return result;
  });
}

defaultMenuConfig.items = formatter(defaultMenuConfig.items).concat(
  asideMenuConfig
);

export default defaultMenuConfig;
