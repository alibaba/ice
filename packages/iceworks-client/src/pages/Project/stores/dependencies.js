import socket from '@src/socket';
import semver from 'semver';

export default {
  dataSource: {
    dependencies: [],
    devDependencies: [],
    status: '',
  },
  async refresh() {
    this.dataSource = await socket.emit('project.dependency.list');
  },
  async upgrade(args) {
    await socket.emit('project.dependency.upgrade', args);
  },
  async setStatus(status) {
    this.dataSource.status = status;
  },
  async reset() {
    await socket.emit('project.dependency.reset');
  },
  async creates(deps, force) {
    const { dependencies } = this.dataSource;
    if (!force) {
      const depsWithoutVersion = deps.filter(({ version }) => !version || version === 'latest');
      const existDeps = depsWithoutVersion.filter(({ package: packageName }) =>
        dependencies.find(({ package: projectPackage }) => projectPackage === packageName));

      const incompatibleDeps = [];
      existDeps.forEach(({ package: packageName }) => {
        const { specifyVersion, latestVersion } = dependencies.find(({ package: projectPackage }) =>
          projectPackage === packageName);
        const {
          major: latestMajor,
        } = semver.minVersion(latestVersion);

        const { major: specifyMajor } = semver.minVersion(specifyVersion);
        if (latestMajor > specifyMajor) {
          incompatibleDeps.push({
            pacakge: packageName,
            version: latestVersion,
          });
        }
      });

      if (incompatibleDeps.length) {
        const error = new Error('存在不兼容的升级');
        error.code = 'INCOMPATIBLE';
        error.info = incompatibleDeps;
        throw error;
      }
    }

    await socket.emit('project.dependency.creates', deps);
  },
};
