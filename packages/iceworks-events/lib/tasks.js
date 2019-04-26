// iceworks events
module.exports = {
  /**
   * 工程任务监听事件定义
   */
  ICEWORKS_TASK_DEV_DATA: 'ICEWORKS_TASK_DEV_DATA', // 启动 dev 数据流
  ICEWORKS_TASK_BUILD_DATA: 'ICEWORKS_TASK_BUILD_DATA', // 构建 build 数据流
  ICEWORKS_TASK_LINT_DATA: 'ICEWORKS_TASK_LINT_DATA', // 检查 lint 数据流

  /**
   * 工程任务发出事件定义
   */
  ICEWORKS_TASK_DEV_OPEN: 'ICEWORKS_TASK_DEV_OPEN', // 启动 dev 命令
  ICEWORKS_TASK_BUILD_OPEN: 'ICEWORKS_TASK_BUILD_OPEN', // 构建 build 命令
  ICEWORKS_TASK_LINT_OPEN: 'ICEWORKS_TASK_LINT_OPEN', // 检查 lint 命令
};
