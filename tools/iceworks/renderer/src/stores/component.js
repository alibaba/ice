import { observable, action, computed, toJS } from 'mobx';
import projects from './projects';
import { isIceMaterial } from '../lib/utils';

// store
import progress from './progress';

class Component {
  @observable
  visible = false;
  @observable
  downloading = false;
  @observable
  source = {};

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
