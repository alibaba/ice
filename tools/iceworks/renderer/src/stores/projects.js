import { ipcRenderer, shell } from 'electron';
import { observable, action, autorun, computed } from 'mobx';
import EventEmitter from 'events';
import Notification from '@icedesign/notification';

// store
import Project from './project';
// utils
import { isProject } from '../lib/project-utils';
import services from '../services';

const { folder, storage, interaction } = services;
const { projectsStorage, recordStorage } = storage;

/* eslint no-console:off */
/** 项目列表存储管理 */
class Projects extends EventEmitter {
  @observable list = []; // 项目列表
  @observable currentProject; // 当前项目

  // 安装面板可见

  constructor() {
    super();

    ipcRenderer.on('menu:project:clearall', () => {
      interaction.confirm(
        {
          type: 'warning',
          title: '提示',
          message: '是否清空项目列表？',
        },
        () => {
          projectsStorage.delete();
          this.list = [];
          this.setProject(null);
        }
      );
    });

    const initProjectPaths = projectsStorage.dataSource || [];
    this.list = initProjectPaths.filter((v) => !!v).map((path) => {
      return new Project({ path });
    });

    const lastWorkProject = recordStorage.get();
    const firstProject = this.list[0];

    this.setProject(this.getProject(lastWorkProject) || firstProject || null);
    autorun(() => {
      // list 的变更实时的保存到 storage 中持久化
      const allProjectPaths = this.list
        .map((project) => {
          return project.fullPath;
        })
        .filter((v) => !!v);
      projectsStorage.set(allProjectPaths);
    });

    // ipcRenderer.on('terminal-output', (event, { path: processCwd, data }) => {
    //   const project = this.getProject(processCwd);
    //   if (project) {
    //     project.appendLog(data);
    //   }
    // });
  }

  @computed
  get isEmpty() {
    return this.list.length === 0;
  }

  /**
   * 添加项目到列表中
   * @param {string} path 项目地址
   */
  @action
  add(path, needInstallDeps) {
    // 避免重复添加
    const newValue = this.list.filter((project) => project.fullPath !== path);
    newValue.unshift(
      new Project({
        path,
        needInstallDeps,
      })
    );
    this.list = newValue;
    // 像项目添加时，总是将当前添加的作为当前项目
    this.setProject(this.list[0]);
  }

  /** 打开一个已存在的项目，并添加到项目中 */
  @action
  addFromFinder(callback = () => {}) {
    folder
      .selector()
      .then(async (paths) => {
        if (paths && paths.length > 0) {
          const selectedPath = paths[0];
          const isLegalProject = await isProject(selectedPath);

          if (this.has(selectedPath)) {
            Notification.info({ message: '已选目录已在 iceworks 项目列表中' });
            this.add(selectedPath);
            callback(null, selectedPath);
          } else if (isLegalProject) {
            this.add(selectedPath);
            Notification.success({ message: '项目添加成功' });
            callback(null, selectedPath);
          } else {
            Notification.warning({
              message: '已选目录 iceworks 无法识别支持，请重新选择',
            });
            setTimeout(() => {
              this.addFromFinder(callback);
            }, 800);
          }
        }
      })
      .catch(() => {
        console.log('取消选择');
      });
  }

  @action
  remove(path, shiftDelete) {
    console.debug('删除项目', path, shiftDelete);

    if (shiftDelete) {
      const trashRemove = shell.moveItemToTrash(path);
      console.debug('删除到回收站', trashRemove);
    }

    const isRemoveCurrent =
      this.currentProject && this.currentProject.fullPath === path;

    this.list = this.list.filter((project) => project.fullPath !== path);

    if (isRemoveCurrent) {
      if (this.list.length > 0) {
        this.setProject(this.list[0]);
      } else {
        this.setProject(null);
      }
    }
  }

  @action
  has(path) {
    return this.list.some((project) => {
      return project.fullPath === path;
    });
  }

  @action
  getProject(path) {
    if (!path) return null;

    const currentProject = this.list.filter(
      (project) => project.fullPath === path
    );

    if (currentProject && currentProject.length) {

      return currentProject[0];
    }

    return null;
  }

  /**
   * 设置当前项目的路径
   */
  @action
  setCurrentProject(path) {
    this.setProject(this.getProject(path));
  }

  @action
  setProject(project) {
    if (project) {
      recordStorage.set(project.fullPath);
    }
    this.currentProject = project;
    if (this.currentProject && this.currentProject.exists) {
      this.emit('change');
    }
  }
}

const projects = new Projects();

projects.setMaxListeners(100);

export default projects;
