/**
 * 菜单配置
 * asideMenuConfig：侧边导航配置
 * {
 *   path: '/dashboard',  // 菜单路径
 *   name: 'Dashboard',   // 菜单名称
 *   navbarName: 'Material Dashboard',  // 二级面包屑导航名称
 *   icon: Dashboard,     // 菜单图标
 * }
 *
 */

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import ContentPaste from '@material-ui/icons/ContentPaste';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';

const asideMenuConfig = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
  },
  {
    path: '/user',
    name: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
  },
  {
    path: '/table',
    name: 'Table List',
    navbarName: 'Table List',
    icon: ContentPaste,
  },
  {
    path: '/typography',
    name: 'Typography',
    navbarName: 'Typography',
    icon: LibraryBooks,
  },
  {
    path: '/icons',
    name: 'Icons',
    navbarName: 'Icons',
    icon: BubbleChart,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    navbarName: 'Notifications',
    icon: Notifications,
  },
  {
    path: '/upgrade-to-pro',
    name: 'Upgrade To PRO',
    navbarName: 'Upgrade To PRO',
    icon: Unarchive,
  },
];

function formatter(data) {
  return data.map((item) => {
    if (item.name) {
      item.sidebarName = item.name;
      delete item.name;
    }
    return { ...item };
  });
}

export default formatter(asideMenuConfig);
