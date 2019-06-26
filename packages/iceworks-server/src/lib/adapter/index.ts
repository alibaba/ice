import Page from './modules/page';
import Dependency from './modules/dependency';
import Configuration from './modules/configuration';
import Task from './modules/task';
import Layout from './modules/layout';
import Menu from './modules/menu';
import Router from './modules/router';
import Git from './modules/git';
import DEF from './modules/def';
import OSS from './modules/oss';
import Todo from './modules/todo';

const config = {
  Guide: {
    title: '引导指南',
    description: '展示 iceworks 的基础功能简介。',
    cover: 'https://img.alicdn.com/tfs/TB1CDlTdEKF3KVjSZFEXXXExFXa-300-300.png',
    isAvailable: true,
    module: null
  },
  Layout: {
    title: '布局列表',
    description: '展示当前项目中 layouts 目录下的所有布局。',
    cover: 'https://img.alicdn.com/tfs/TB1KUD8c4iH3KVjSZPfXXXBiVXa-300-300.png',
    isAvailable: true,
    module: Layout
  },
  Page: {
    title: '页面列表',
    description: '展示当前项目中 pages 目录下的所有页面，新建页面快捷入口，支持对已有页面下载区块。',
    cover: 'https://img.alicdn.com/tfs/TB1Vl4javBj_uVjSZFpXXc0SXXa-300-300.png',
    isAvailable: true,
    module: Page
  },
  Router: {
    title: '路由管理',
    description: '展示项目中的所有路由，支持对路由的增删改。',
    cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
    isAvailable: true,
    module: Router
  },
  Menu: {
    title: '菜单管理',
    description: '展示项目中的所有菜单，支持对菜单的增删改。',
    cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',
    isAvailable: true,
    module: Menu
  },
  Git: {
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
  DEF: {
    title: 'DEF 发布',
    description: '支持阿里内网 DEF 发布构建流程，发布到日常以及线上。',
    cover: 'https://img.alicdn.com/tfs/TB1qDkAXMFY.1VjSZFnXXcFHXXa-300-300.png',
    isAvailable: false,
    module: DEF
  },
  Todo: {
    title: 'TODO',
    description: '收集项目代码中的TODO、FIXME、HACK等需要处理的注释信息。',
    cover: 'https://img.alicdn.com/tfs/TB1zZJKdEGF3KVjSZFmXXbqPXXa-300-300.png',
    isAvailable: false,
    module: Todo
  },
  Dependency: {
    title: '依赖管理',
    description: '探测项目中依赖是否已安装，以及依赖安装的版本，支持快捷安装项目依赖；当依赖出现新版时，支持一键更新依赖的操作。',
    cover: 'https://img.alicdn.com/tfs/TB1nPY8c21H3KVjSZFBXXbSMXXa-300-300.png',
    isAvailable: false,
    module: Dependency
  },
  Task: {
    title: '任务管理',
    description: '工程相关任务的执行。',
    cover: '',
    isAvailable: true,
    module: Task
  },
  Configuration: {
    title: '工程配置',
    description: '工程相关配置的管理。',
    cover: '',
    isAvailable: true,
    module: Configuration
  },
};

export default config;
