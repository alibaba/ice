export const mockFormData = {
  modelId: 'ss000220003',
  name: '6-26测试01',
  typeName: '仓储',
  version: '1.0',
  desc: '一些描述',
};

export const mockTableData = [
  {
    typeName: '属性',
    name: '6-26属性测试01',
    identifier: '10001',
    desc: '设备正常',
  },
  {
    typeName: '属性',
    name: '6-26属性测试02',
    identifier: '10002',
    desc: '设备测试中',
  },
  {
    typeName: '属性',
    name: '6-26属性测试03',
    identifier: '10003',
    desc: '设备停用',
  },
];

export const formConfig = {
  rows: [['modelId', 'version'], ['name', 'typeName'], ['desc']],
  labels: {
    modelId: '型号',
    name: '型号名称',
    typeName: '类型',
    version: '版本',
    desc: '描述',
  },
};

export const dialogFormConfig = {
  rows: [['identifier'], ['typeName'], ['name'], ['desc']],
  labels: {
    identifier: '标示符',
    typeName: '功能类型',
    name: '功能名称',
    desc: '设备描述',
  },
};
