module.exports = {
  prompts: {
    title: {
      type: 'input',
      message: '标题',
      default: 'ice 后台管理模板',
      validate: (value) => {
        value = value.trim();
        if (!value) {
          return '标题不能为空，请重新输入';
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
  },
  completeMessage:
    '下一步你可以在{{#inPlace}}当前{{else}} {{destDirName}} {{/inPlace}}目录下\n\n  执行 `ice-devtools start` 查看官方默认初始 Demo\n\n 执行 `ice-devtools add` 开始创建自己的物料',
};
