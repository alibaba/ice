const asideMenuConfig = [
  {
    name: 'Dashboard',
    icon: 'nb-home',
    path: '/dashboard',
    home: true,
  },
  {
    name: 'FEATURES',
    group: true,
  },
  {
    name: 'UI Features',
    icon: 'nb-keypad',
    path: '/ui-features',
    children: [
      {
        name: 'Buttons',
        path: '/ui-features/buttons',
      },
      {
        name: 'Grid',
        path: '/ui-features/grid',
      },
      {
        name: 'Icons',
        path: '/ui-features/icons',
      },
      {
        name: 'Modals',
        path: '/ui-features/modals',
      },
      {
        name: 'Popovers',
        path: '/ui-features/popovers',
      },
      {
        name: 'Typography',
        path: '/ui-features/typography',
      },
      {
        name: 'Animated Searches',
        path: '/ui-features/search-fields',
      },
      {
        name: 'Tabs',
        path: '/ui-features/tabs',
      },
    ],
  },
  {
    name: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        name: 'Form Inputs',
        path: '/forms/inputs',
      },
      {
        name: 'Form Layouts',
        path: '/forms/layouts',
      },
    ],
  },
  {
    name: 'Components',
    icon: 'nb-gear',
    children: [
      {
        name: 'Tree',
        path: '/components/tree',
      },
      {
        name: 'Notifications',
        path: '/components/notifications',
      },
    ],
  },
  {
    name: 'Maps',
    icon: 'nb-location',
    children: [
      {
        name: 'Google Maps',
        path: '/maps/gmaps',
      },
      {
        name: 'Leaflet Maps',
        path: '/maps/leaflet',
      },
      {
        name: 'Bubble Maps',
        path: '/maps/bubble',
      },
      {
        name: 'Search Maps',
        path: '/maps/searchmap',
      },
    ],
  },
  {
    name: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        name: 'Echarts',
        path: '/charts/echarts',
      },
      {
        name: 'Charts.js',
        path: '/charts/chartjs',
      },
      {
        name: 'D3',
        path: '/charts/d3',
      },
    ],
  },
  {
    name: 'Editors',
    icon: 'nb-title',
    children: [
      {
        name: 'TinyMCE',
        path: '/editors/tinymce',
      },
      {
        name: 'CKEditor',
        path: '/editors/ckeditor',
      },
    ],
  },
  {
    name: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        name: 'Smart Table',
        path: '/tables/smart-table',
      },
    ],
  },
  {
    name: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        name: '404',
        path: '/miscellaneous/404',
      },
    ],
  },
  {
    name: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        name: 'Login',
        path: '/auth/login',
      },
      {
        name: 'Register',
        path: '/auth/register',
      },
      {
        name: 'Request Password',
        path: '/auth/request-password',
      },
      {
        name: 'Reset Password',
        path: '/auth/reset-password',
      },
    ],
  },
];

export { asideMenuConfig };
