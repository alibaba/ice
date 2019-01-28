import { observable, action, computed } from 'mobx';

class Progress {
  @observable statusText = '';
  @observable visible = false;
  @observable showProgress = false;
  @observable showTerminal = false;
  @observable progressValue = 0; // 进度
  @observable progressSpeedValue = 0; // 下载速度
  @observable progressRemainingValue = 0; // 剩余时间
  @observable progressSection = 100; // 
  @observable SectionCount = 1; // 多文件下载合并进度, 几段
  @observable currentCount = 1; // 每段长度

  @action
  start(showProgress = false) {
    this.visible = true;
    this.showProgress = showProgress;
  }

  @action
  end() {
    this.reset();
  }

  @action
  setStatusText(text) {
    this.statusText = text;
  }

  @action
  setSectionCount(count) {
    this.SectionCount = count; // 几段
    this.progressSection = Number((100 / count).toFixed(1)); // 每段长度
  }

  @action
  setShowTerminal(isShow) {
    this.showTerminal = isShow;
  }

  @action
  setShowProgress(isShow) {
    this.showProgress = isShow;
  }

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

  @action
  reset() {
    this.statusText = '';
    this.visible = false;
    this.showProgress = false;
    this.showTerminal = false;
    this.progressValue = 0; // 进度
    this.progressSpeedValue = 0; // 下载速度
    this.progressRemainingValue = 0; // 剩余时间
    this.progressSection = 100; 
    this.sectionCount = 1;
    this.currentCount = 1;
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
  // 多区块下载合并成一个进度的逻辑。
  @action
  handleProgressFunc = (state = {}) => {
    if (state.percent) {
      if (state.percent >= 1) {
        if(this.SectionCount === this.currentCount) {
          this.progressValue = 100;
          this.progressSpeedValue = 0;
          this.progressRemainingValue = 0;
        } else {
          this.currentCount++;
        }
      } else if (state.percent > 0) {
        this.progressValue = Number(state.percent) * this.progressSection 
                              + (this.currentCount - 1) * this.progressSection;
        this.progressSpeedValue = state.speed || 0;
        this.progressRemainingValue = (state.time && state.time.remaining) || 0;
      }
    }
  };


}

export default new Progress();
