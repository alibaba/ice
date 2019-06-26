
import Configuration from './modules/configuration';
import Task from './modules/task';

// extend origin
import Layout from '../adapter/modules/layout';
import Git from '../adapter/modules/git';
import OSS from '../adapter/modules/oss';
import Dependency from '../adapter/modules/dependency';
import Todo from '../adapter/modules/todo';

const config = {
  guide: {
    title: '引导指南',
    description: '展示 iceworks 的基础功能简介。',
    cover: 'https://img.alicdn.com/tfs/TB1CDlTdEKF3KVjSZFEXXXExFXa-300-300.png',
    isAvailable: true,
    module: null
  },
  layout: {
    title: '布局列表',
    description: '展示当前项目中 layouts 目录下的所有布局。',
    cover: 'https://img.alicdn.com/tfs/TB1KUD8c4iH3KVjSZPfXXXBiVXa-300-300.png',
    isAvailable: true,
    module: Layout
  },
  git: {
    title: 'Git 仓库管理',
    description: '关联项目的 git 仓库',
    cover: 'https://img.alicdn.com/tfs/TB1GVb_c79E3KVjSZFGXXc19XXa-300-300.png',
    isAvailable: false,
    module: Git
  },
  OSS: {
    title: '阿里云 OSS',
    description: '将项目构建结果上传到阿里云 OSS。',
    cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
    isAvailable: false,
    module: OSS
  },
  todo: {
    title: '待办事项',
    description: '收集项目代码中的TODO、FIXME、HACK等需要处理的注释信息。',
    cover: 'https://img.alicdn.com/tfs/TB1zZJKdEGF3KVjSZFmXXbqPXXa-300-300.png',
    isAvailable: false,
    module: Todo
  },
  dependency: {
    title: '依赖管理',
    description: '探测项目中依赖是否已安装，以及依赖安装的版本，支持快捷安装项目依赖；当依赖出现新版时，支持一键更新依赖的操作。',
    cover: 'https://img.alicdn.com/tfs/TB1nPY8c21H3KVjSZFBXXbSMXXa-300-300.png',
    isAvailable: false,
    module: Dependency
  },
  task: {
    title: '任务管理',
    description: '工程相关任务的执行。',
    cover: '',
    isAvailable: true,
    module: Task
  },
  configuration: {
    title: '工程配置',
    description: '工程相关配置的管理。',
    cover: '',
    isAvailable: true,
    module: Configuration
  },
};

export default config;
