/* global log:true */

const generateProject = require('./generate-project');
const log = require('../../logger');

/**
 * 新建项目流程
 */

const reqQueue = [];

class CreateManager {
  add({ data, path: targetPath, progressFunc }, done) {
    const option = Object.assign(
      {},
      {
        targetPath: targetPath, // 项目路径
        scaffold: data.scaffold,
        projectName: data.projectName,
        isCustomScaffold: data.isCustomScaffold,
        layoutConfig: data.layoutConfig,
        progressFunc: progressFunc,
        nodeFramework: data.nodeFramework,
      }
    );
    generateProject(option, (req) => {
      reqQueue.push(req);
    })
      .then(() => {
        log.info('generator process complete');
        done(null);
      })
      .catch((error) => {
        log.error('create project error', error);
        done(error);
      });
  }

  /**
   * 销毁所有
   */
  destroy() {
    let req = null;
    while ((req = reqQueue.pop())) {
      req.abort();
    }
  }
}

module.exports = new CreateManager();
