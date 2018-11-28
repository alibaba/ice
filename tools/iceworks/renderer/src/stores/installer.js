import { observable, action } from 'mobx';

class Installer {
  @observable cwd = '';
  @observable deps = ''; // 需要安装的依赖内容
  @observable installing = false;
  @observable type = 'dependencies';
  @observable visible = false;

  // 打开安装面板，每一次都重置 cwd 路径
  @action
  open(cwd, type = 'dependencies') {
    this.cwd = cwd;
    this.type = type;
    this.deps = '';
    this.visible = true;
  }
  @action
  close() {
    this.visible = false;
  }

  @action
  toggle() {
    this.visible = !this.visible;
  }
}

export default new Installer();
