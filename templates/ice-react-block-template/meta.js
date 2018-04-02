const BLOCK_CATEGORIES = [
  {
    name: '表格',
    value: 'table',
  },
  {
    name: '表单',
    value: 'form',
  },
  {
    name: '图表',
    value: 'chart',
  },
  {
    name: '列表',
    value: 'list',
  },
  {
    name: '模态框',
    value: 'modal',
  },
  {
    name: '筛选',
    value: 'filter',
  },
  {
    name: '数据展示',
    value: 'data-display',
  },
  {
    name: '信息展示',
    value: 'info-display',
  },
  {
    name: '异常',
    value: 'exception',
  },
  {
    name: '布局',
    value: 'layout',
  },
];

module.exports = {
  prompts: {
    title: {
      type: 'input',
      message: '标题',
      default: '示例区块',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return '区块标题不能为空，请重新输入';
        }
        return true;
      },
    },
    version: {
      type: 'string',
      required: true,
      message: '版本',
      default: '1.0.0',
    },
    description: {
      type: 'string',
      required: true,
      message: '描述(可选)',
    },
    categories: {
      type: 'checkbox',
      message: '分类',
      choices: BLOCK_CATEGORIES,
      validate: (answer) => {
        if (answer.length < 1) {
          return '必须选则一个分类，请重新选择';
        }
        return true;
      },
      filter: (answer) => {
        return answer;
      },
    },
  },
};
