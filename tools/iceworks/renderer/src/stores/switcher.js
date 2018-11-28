import { observable, action } from 'mobx';

class Switch {
  @observable visible = false;

  @action
  open() {
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

export default new Switch();
