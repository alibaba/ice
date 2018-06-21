// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: '药价管理',
    path: '/',
    icon: 'home',
  },
  {
    name: '系统管理',
    path: '/system',
    icon: 'home',
    children: [
      {
        name: '业务权限审批',
        path: '/system/business',
      },
      {
        name: '手术条目字典',
        path: '/system/surgery',
      },
      {
        name: '医生权限申请',
        path: '/system/doctor',
      },
    ],
  },
  {
    name: '患者管理',
    path: '/patients',
    icon: 'home',
    children: [
      {
        name: '黑名单管理',
        path: '/patients/blacklist',
      },
      {
        name: '患者列表',
        path: '/patients/patientlist',
      },
    ],
  },
  {
    name: '字典管理',
    path: '/dict',
    icon: 'home',
    children: [
      {
        name: '药品字典',
        path: '/dict/medicine',
      },
      {
        name: '医嘱频次',
        path: '/dict/advice',
      },
    ],
  },
  {
    name: '智能排班',
    path: '/schedule',
    icon: 'home',
    children: [
      {
        name: '排班计划',
        path: '/schedule/plan',
      },
      {
        name: '排班规则',
        path: '/schedule/Rule',
      },
    ],
  },
  {
    name: '药库管理',
    path: '/storage',
    icon: 'home',
    children: [
      {
        name: '接收退库',
        path: '/storage/accept',
      },
      {
        name: '退货审核',
        path: '/storage/check',
      },
    ],
  },
  {
    name: '出入院管理',
    path: '/inpationt',
    icon: 'home',
    children: [
      {
        name: '入院登记',
        path: '/storage/enter',
      },
      {
        name: '预交金管理',
        path: '/storage/payment',
      },
    ],
  },
  {
    name: '医保平台',
    path: '/insurance',
    icon: 'home',
    children: [
      {
        name: '医保注册',
        path: '/insurance/registration',
      },
    ],
  },
];

const headerMenuConfig = asideMenuConfig;

export default headerMenuConfig;
