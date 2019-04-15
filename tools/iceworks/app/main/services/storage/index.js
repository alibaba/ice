const Store = require('./Store');

module.exports = {
  statStorage: new Store('stat'), // 统计记录
  recordStorage: new Store('record'), // 项目使用记录
  projectsStorage: new Store('projects'), // 所有项目列表
  workspaceStorage: new Store('workspace'), // 工作空间
  icelandStatStorage: new Store('iceland-stat'), // Iceland 统计记录
};
