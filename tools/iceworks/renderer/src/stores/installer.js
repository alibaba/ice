import { observable, action } from 'mobx';

/**
 * 安装路径统一从currentProject中获取
 */
class Installer {
  @observable deps = ''; // 需要安装的依赖内容
  @observable installing = false;
  @observable type = 'dependencies';
  @observable visible = false;

  @action
  open(type = 'dependencies') {
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
