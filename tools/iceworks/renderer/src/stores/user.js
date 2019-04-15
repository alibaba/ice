import { observable, action } from 'mobx';


class User {
  @observable visible = false;
  @observable data = {}

  @action
  open() {
    // 未登录时可唤起
    if (this.data && !this.data.workid) {
      this.visible = true;
    }
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

export default new User();
