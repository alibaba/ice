const { resolve } = require('app-root-path');
const { nativeImage, TouchBar, remote } = require('electron');
const { TouchBarButton, TouchBarSpacer } = TouchBar;

function createIcon(path) {
  return nativeImage.createFromPath(
    resolve('./static/touchbar/' + path + '.png')
  );
}

const startIcon = createIcon('start');
const stopIcon = createIcon('stop');
const pageIcon = createIcon('page');
const buildIcon = createIcon('build');
const codeIcon = createIcon('code');
const terminalIcon = createIcon('terminal');
const folderIcon = createIcon('folder');
const logoIcon = createIcon('logo');

const logo = new TouchBarButton({
  icon: logoIcon,
  click: () => {
    // TODO
  },
});

module.exports = ({
  startProject,
  stopProject,
  createPage,
  buildProject,
  openEditor,
  openTerminal,
  openFolder,
}) => {
  const items = [];

  if (startProject) {
    items.push(
      new TouchBarButton({
        icon: startIcon,
        click: startProject,
      })
    );
  } else if (stopProject) {
    items.push(
      new TouchBarButton({
        icon: stopIcon,
        click: stopProject,
      })
    );
  }

  if (createPage) {
    items.push(
      new TouchBarButton({
        icon: pageIcon,
        click: createPage,
      })
    );
  }

  if (buildProject) {
    items.push(
      new TouchBarButton({
        icon: buildIcon,
        click: buildProject,
      })
    );
  }

  if (openEditor) {
    items.push(
      new TouchBarButton({
        icon: codeIcon,
        click: openEditor,
      })
    );
  }

  if (openTerminal) {
    items.push(
      new TouchBarButton({
        icon: terminalIcon,
        click: openTerminal,
      })
    );
  }

  if (openFolder) {
    items.push(
      new TouchBarButton({
        icon: folderIcon,
        click: openFolder,
      })
    );
  }

  const touchBar = new TouchBar({
    items,
    escapeItem: logo,
  });

  // Hard code set touchBar with home window
  global.windows.home.setTouchBar(touchBar);
};
