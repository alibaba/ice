/**
 * 据日志情况分析进程状态
 */
const stripAnsi = require('strip-ansi');

const sendToWebContents = require('../../helper/sendToWebContents');

const serverURLRegex = /https?:\/\/((?:\d+\.\d+\.\d+\.\d+)|localhost):(\d{2,}\/?)/g;
const statusDevCompiling = /Compiling\.\.\./i;
const statusDevSuccess = /Compiled successfully/i;

module.exports = function detection(projectPath, str) {
  str = stripAnsi(str); // 移除 ansi 码
  if (serverURLRegex.test(str)) {
    const url = str.match(serverURLRegex);
    console.log('检测到路径地址', url[0]);
    sendToWebContents(global.windows.home, 'update_project', {
      message: {
        action: 'update_project',
        message: 'server_finished',
        data: {
          statusDev: 'working',
          serverUrl: `${url[0]}`,
        },
      },
      path: projectPath,
    });
  } else if (statusDevCompiling.test(str)) {
    // 这种编译中
    sendToWebContents(global.windows.home, 'update_project', {
      message: {
        action: 'update_project',
        message: 'compiler_compiling',
        data: {
          statusCompile: 'compiling',
        },
      },
      path: projectPath,
    });
  } else if (statusDevSuccess.test(str)) {
    // 编译完成
    sendToWebContents(global.windows.home, 'update_project', {
      message: {
        action: 'update_project',
        message: 'compiler_success',
        data: {
          statusCompile: 'success',
        },
      },
      path: projectPath,
    });
  }
};
