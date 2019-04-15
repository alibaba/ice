import { observable, action, computed } from 'mobx';

class Component {
  @observable
  visible = false;
  @observable
  downloading = false;
  @observable
  currentComponent = {};

  @computed
  get isDownloading() {
    return this.downloading === true;
  }

  @action
  downloadStart() {
    this.downloading = true;
  }

  @action
  downloadDone() {
    this.downloading = false;
  }

  @action
  open() {
    this.visible = true;
  }

  @action
  close() {
    this.visible = false;
  }
}

export default new Component();
