import { ipcRenderer } from 'electron';

/**
 * 统一监听 main process 进程事件
 * 管理每个 project 的状态，ice-scripts 进程发送事件更新项目的状态
 * ice-scripts 通过 iceworks ipc 发送
 *
 * @param {Object} projects mobx observer object
 */
export default {
  initialize: (projects) => {
    // dev 回调
    ipcRenderer.on('update_project', (event, eventData) => {
      const { path, message: eventMessage } = eventData;
      // ice dev 发送的消息
      // eslint-disable-next-line no-unused-vars
      const { action, message, data = {} } = eventMessage;
      // console.log(action, message, data);
      const project = projects.getProject(path);
      if (project) {
        project.batchUpdate(data);
      }
    });
  },
};
