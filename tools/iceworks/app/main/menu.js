const { Menu, shell, BrowserWindow } = require('electron');
const electronLog = require('electron-log');

const { isMac, isWin, isDev } = require('./shared');
const autoUpdater = require('./autoUpdater');
const sendToWebContents = require('./helper/sendToWebContents');
const { openAboutWindow } = require('./windowList');

function windowHomeRouter(windows, { state, title, url }) {
  sendToWebContents(windows.home, 'router.push', {
    state,
    title,
    url,
  });
  if (windows.home.isVisible()) {
    windows.home.focus();
  } else {
    windows.home.show();
  }
}

exports.trayMenu = (app, windows, tray) => {
  const template = [
    {
      label: '关于 Iceworks',
    },
    {
      type: 'separator',
    },
    {
      label: '设置',
      click() {
        windowHomeRouter(windows, {
          state: null,
          title: 'Settings',
          url: '/settings',
        });
      },
    },
    { type: 'separator' },
    {
      abel: '退出',
      role: 'quit',
      accelerator: 'Cmd+Q',
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  return menu;
};

exports.appMenu = (app, windows) => {
  const helpSubmenu = [
    {
      label: '文档',
      click() {
        shell.openExternal('https://alibaba.github.io/ice');
      },
    },
    {
      label: 'Midway 文档',
      click() {
        shell.openExternal('https://midwayjs.org/midway/guide.html');
      },
    },
    {
      label: 'Github',
      click() {
        shell.openExternal('https://github.com/alibaba/ice');
      },
    },
    { type: 'separator' },
    {
      label: '反馈问题',
      click() {
        shell.openExternal(
          'https://github.com/alibaba/ice/issues/new?labels=iceworks'
        );
      },
    },
    { type: 'separator' },
    {
      label: '查看许可证',
      click() {
        shell.openExternal(
          'https://github.com/alibaba/ice/blob/master/LICENSE'
        );
      },
    },
    {
      label: '隐私声明',
      click() {
        shell.openExternal(
          'https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/suit_bu1_taobao201703241622_61002.html'
        );
      },
    },
    { type: 'separator' },
    {
      label: '切换开发人员工具',
      accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
      click(item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
    },
    {
      label: '查看运行日志',
      click() {
        const logPath = electronLog.transports.file.findLogPath(app.getName());
        shell.showItemInFolder(logPath);
      },
    },
  ];

  if (isWin) {
    helpSubmenu.push({ type: 'separator' });
    helpSubmenu.push({
      label: '检查更新...',
      click() {
        autoUpdater.show();
      },
    });
    helpSubmenu.push({ type: 'separator' });
    helpSubmenu.push({
      label: '关于',
      click() {
        openAboutWindow();
      },
    });
  }

  const template = [
    {
      label: '项目',
      submenu: [
        {
          label: '运行日志',
          accelerator: 'Control+`',
          click() {
            sendToWebContents(windows.home, 'menu:project:console:toggle');
          },
        },
        { type: 'separator' },
        {
          label: '清空列表',
          click() {
            sendToWebContents(windows.home, 'menu:project:clearall');
          },
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
          role: 'undo',
          accelerator: 'CommandOrControl+Z',
        },
        {
          label: '重做',
          role: 'redo',
          accelerator: 'CommandOrControl+Shift+Z',
        },
        { type: 'separator' },
        {
          label: '剪切',
          role: 'cut',
          accelerator: 'CommandOrControl+X',
        },
        {
          label: '复制',
          role: 'copy',
          accelerator: 'CommandOrControl+C',
        },
        {
          label: '粘贴',
          role: 'paste',
          accelerator: 'CommandOrControl+V',
        },
        {
          label: '选择全部',
          role: 'selectall',
          accelerator: 'CommandOrControl+A',
        },
      ],
    },
    {
      label: '窗口',
      submenu: [
        {
          label: '关闭',
          role: 'close',
          accelerator: 'CommandOrControl+W',
        },
        {
          label: '最小化',
          role: 'minimize',
          accelerator: 'CommandOrControl+M',
        },
        {
          label: '缩放',
          role: 'zoom',
        },
        {
          label: '切换全屏',
          role: 'togglefullscreen',
          accelerator: isMac ? 'Ctrl+Command+F' : 'F11',
        },
        { type: 'separator' },
        {
          label: '全部置于顶层',
          role: 'front',
        },
      ],
    },
    {
      label: '帮助',
      submenu: helpSubmenu,
    },
  ];

  if (isMac) {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: '关于 Iceworks',
          click() {
            openAboutWindow();
          },
        },
        { type: 'separator' },
        {
          label: '检查更新...',
          click() {
            // 打开软件更新窗口
            autoUpdater.show();
          },
        },
        { type: 'separator' },
        {
          label: '设置',
          accelerator: 'CmdOrCtrl+,',
          click() {
            windowHomeRouter(windows, {
              state: null,
              title: 'Settings',
              url: '/settings',
            });
          },
        },
        { type: 'separator' },
        {
          label: '服务',
          role: 'services',
          submenu: [],
        },
        { type: 'separator' },
        { label: '隐藏 Iceworks', role: 'hide' },
        { label: '隐藏其他', role: 'hideothers' },
        { label: '全部显示', role: 'unhide' },
        { type: 'separator' },
        { label: '退出 Iceworks', role: 'quit' },
      ],
    });
  }

  if (isDev) {
    template.push({
      label: '开发调试',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) {
              if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach((win) => {
                  if (win.id > 1) {
                    win.close();
                  }
                });
              }
              focusedWindow.reload();
            }
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
        },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
