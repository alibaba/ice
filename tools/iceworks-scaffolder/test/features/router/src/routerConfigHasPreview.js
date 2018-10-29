import Page3 from './pages/Page3';
import IceworksPreviewPage from './pages/IceworksPreviewPage';
import BlankLayout from './layouts/BlankLayout';

const routerConfig = [
  {
    path: 'hello',
    component: Page3,
    layout: BlankLayout,
  },
  {
    path: '/IceworksPreviewPage',
    layout: BlankLayout,
    component: IceworksPreviewPage,
  },
];

export default routerConfig;
