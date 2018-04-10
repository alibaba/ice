const BLOCK_CATEGORIES = [
  '表格',
  '表单',
  '图表',
  '列表',
  '模态框',
  '筛选',
  '数据展示',
  '信息展示',
  '异常',
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
