import { observable, action, computed } from 'mobx';

const statusTextMap = {
  scaffold: {
    ing: '项目文件生成中',
    done: '项目创建完成',
  },
  nodeScaffold: {
    ing: 'Node 项目文件生成中',
    done: 'Node 项目创建完成',
  }
};

class Progress {
  @observable statusTextConfig = {};
  @observable statusText = '';
  @observable status = 'init';
  @observable progressValue = 0; // 进度
  @observable progressSpeedValue = 0; // 下载速度
  @observable progressRemainingValue = 0; // 剩余时间

  @computed
  get progress() {
    return Number(this.progressValue.toFixed(1));
  }

  @computed
  get progressSpeed() {
    return Math.floor(this.progressSpeedValue / 1024) || '-';
  }

  @computed
  get progressRemaining() {
    return Math.floor(this.progressRemainingValue) || '-';
  }

  @computed
  get isInProgress() {
    return this.status !== 'init';
  }

  @action
  reset() {
    this.statusTextConfig = {};
    this.statusText = '';
    this.status = 'init';
    this.progressValue = 0; // 进度
    this.progressSpeedValue = 0; // 下载速度
    this.progressRemainingValue = 0; // 剩余时间
  }

  @action
  start() {
    this.setStatus('ing');
  }

  @action
  end() {
    this.setStatus('done');
    setTimeout(() => {
      this.reset();
    }, 1000)
  }

  @action
  abort() {
    this.reset();
  }

  @action
  setType(type) {
    this.statusTextConfig = statusTextMap[type] || {};
  }

  @action
  setStatus(status) {
    this.status = status;
    this.statusText = this.statusTextConfig[status] || '';
  }

  // @see https://www.npmjs.com/package/request-progress
  /**
    {
      percent: 0.5, // Overall percent (between 0 to 1)
      speed: 554732, // The download speed in bytes/sec
      size:
      {
        total: 90044871, // The total payload size in bytes
        transferred: 27610959 // The transferred payload size in bytes
      },
      time:
      {
        elapsed: 36.235, // The total elapsed seconds since the start (3 decimals)
        remaining: 81.403 // The remaining seconds to finish (3 decimals)
      }
    }
   */
  @action
  handleProgressFunc = (state) => {
    if (state.percent) {
      if (state.percent >= 1) {
        this.setStatus('done');
      } else if (state.percent > 0) {
        this.setStatus('ing');
        this.progressValue = Number(state.percent) * 100;
        this.progressSpeedValue = state.speed || 0;
        this.progressRemainingValue = (state.time && state.time.remaining) || 0;
      }
      
    }
  };
}

export default new Progress();
