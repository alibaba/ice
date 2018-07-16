// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import DefaultLayout from './layouts/DefaultLayout';
import Breadcrumbs from './pages/Base/Breadcrumbs';
import Cards from './pages/Base/Cards';
import Carousels from './pages/Base/Carousels';
import Collapses from './pages/Base/Collapses';
import Dropdowns from './pages/Base/Dropdowns';
import Forms from './pages/Base/Forms';
import Jumbotrons from './pages/Base/Jumbotrons';
import ListGroups from './pages/Base/ListGroups';
import Navbars from './pages/Base/Navbars';
import Navs from './pages/Base/Navs';
import Paginations from './pages/Base/Paginations';
import Popovers from './pages/Base/Popovers';
import ProgressBar from './pages/Base/ProgressBar';
import Switches from './pages/Base/Switches';
import Tables from './pages/Base/Tables';
import Tabs from './pages/Base/Tabs';
import Tooltips from './pages/Base/Tooltips';
import BrandButtons from './pages/Buttons/BrandButtons';
import ButtonDropdowns from './pages/Buttons/ButtonDropdowns';
import ButtonGroups from './pages/Buttons/ButtonGroups';
import Buttons from './pages/Buttons/Buttons';
import Charts from './pages/Charts';
import Dashboard from './pages/Dashboard';
import CoreUIIcons from './pages/Icons/CoreUIIcons';
import Flags from './pages/Icons/Flags';
import FontAwesome from './pages/Icons/FontAwesome';
import SimpleLineIcons from './pages/Icons/SimpleLineIcons';
import Alerts from './pages/Notifications/Alerts';
import Badges from './pages/Notifications/Badges';
import Modals from './pages/Notifications/Modals';
import Colors from './pages/Theme/Colors';
import Typography from './pages/Theme/Typography';
import Widgets from './pages/Widgets/Widgets';
import Users from './pages/Users/Users';
import User from './pages/Users/User';

const routerConfig = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  {
    path: '/buttons/button-dropdowns',
    name: 'Button Dropdowns',
    component: ButtonDropdowns,
  },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    component: ButtonGroups,
  },
  {
    path: '/buttons/brand-buttons',
    name: 'Brand Buttons',
    component: BrandButtons,
  },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  {
    path: '/icons/simple-line-icons',
    name: 'Simple Line Icons',
    component: SimpleLineIcons,
  },
  {
    path: '/notifications',
    exact: true,
    name: 'Notifications',
    component: Alerts,
  },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routerConfig;
