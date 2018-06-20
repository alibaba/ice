// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '系统管理',
    path: '/basic',
    children: [
      {
        name: '业务权限审批',
        path: '/basic/PermissionAppliListForDep',
      },
      {
        name: '手术条目字典',
        path: '/basis/PermissionEntryPermissions',
      },
      {
        name: '医生权限申请',
        path: '/basis/PermissionAppliListForDoc',
      },
    ],
  },
  {
    name: '患者管理',
    path: '/patients',
    children: [
      {
        name: '黑名单管理',
        path: '/patients/blacklist',
      },
      {
        name: '患者列表',
        path: '/patients/patientList',
      },
    ],
  },
  {
    name: '字典管理',
    path: '/medicine',
    children: [
      {
        name: '药品字典',
        path: '/medicine/MedicineDictionary',
      },
      {
        name: '医嘱频次',
        path: '/medicine/AdviceManage',
      },
    ],
  },
  {
    name: '智能排班',
    path: '/schedule',
  },
  {
    name: '票据管理',
    path: '/bill',
  },
  {
    name: '药库管理',
    path: '/medicine',
  },
  {
    name: '出入院管理',
    path: '/inpationtManage',
  },
  {
    name: '住院费用管理',
    path: '/costManage',
  },
  {
    name: '医保平台',
    path: '/insurance',
  },
  {
    name: '药房管理',
    path: '/medicine',
  },
];

export { headerMenuConfig };
