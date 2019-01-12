/* eslint jsx-a11y/media-has-caption: 0, jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { Component } from 'react';
import { Dialog, Grid } from '@alifd/next';

const { Row, Col } = Grid;

const data = [
  {
    title: '汽车/车品',
    value: [
      {
        fee: 1500,
        desc:
          '1. 外观与内部360度展示，包含车内展示，包含模特<br /> 2. 特写细节与质感，包括单不限于材质、五金件等<br /> 3. 有文案与讲解说明材质工艺的特殊性，实际使用效果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50040312475.mp4',
        videoType: '外观与工艺',
      },
      {
        fee: 1500,
        desc:
          '1. 模特实车内驾驶与使用，讲解产品结构与功能<br /> 2. 教学中涉及到的步骤文案说明，不同商品与型号标注清晰<br /> 3. 使用该商品完成的成果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50104638766.mp4',
        videoType: '评测教学',
      },
      {
        fee: 1500,
        desc:
          '1. 模特车内展示外观与内部结构展示<br /> 2. 主要功能与亮点讲解并且试用<br /> 3. 同类商品或者同款商品中不同色号之间对比',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50104590975.mp4',
        videoType: '功能讲解',
      },
    ],
  },
  {
    title: '美食',
    value: [
      {
        fee: 500,
        desc:
          '1. 外观与内部360度展示<br /> 2. 特写细节与质感，包括单不限于材质、五金件等<br /> 3. 有文案与讲解说明材质工艺的特殊性',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50047536808.mp4',
        videoType: '外观与工艺',
      },
      {
        fee: 1500,
        desc:
          '1. 明确教学场景制作菜肴烘培等，制作步骤需要文案或者讲解说明<br /> 2. 包含厨房场景与1名模特，原料与最终成品出炉展示，包含品尝环节',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50094498364.mp4',
        videoType: '评测教学',
      },
      {
        fee: 1500,
        desc:
          '1. 厨房等使用场景下拍摄，展示外观与内部结构<br /> 2. 主要功能讲解与掩饰，亮点功能讲解需要突出与同类产品的差异<br /> 3. 功能试用，展示效果',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50045264679.mp4',
        videoType: '功能讲解',
      },
    ],
  },
  {
    title: '电器',
    value: [
      {
        fee: 1000,
        desc:
          '1. 外观与内部360度展示<br /> 2. 特写细节与质感，包括单不限于材质、五金件等<br /> 3. 有文案与讲解说明材质工艺的特殊性',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50089460031.mp4',
        videoType: '外观与工艺',
      },
      {
        fee: 1500,
        desc:
          '1. 从某个具体使用场景出发，讲解产品结构与功能<br /> 2. 教学中涉及到的步骤文案说明，不同商品与型号标注清晰<br /> 3. 使用该商品完成的成果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50043016650.mp4',
        videoType: '评测教学',
      },
      {
        fee: 2000,
        desc:
          '1. 展示外观与内部结构展示<br /> 2. 主要功能与亮点讲解并且试用<br /> 3. 同类商品或者同款商品中不同色号之间对比',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50043016650.mp4',
        videoType: '功能讲解',
      },
    ],
  },
  {
    title: '数码',
    value: [
      {
        fee: 1000,
        desc:
          '1. 外观与内部360度展示<br /> 2. 特写细节与质感，包括单不限于材质、五金件等<br /> 3. 有文案与讲解说明材质工艺的特殊性',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50065208706.mp4',
        videoType: '外观与工艺',
      },
      {
        fee: 1500,
        desc:
          '1. 从某个具体使用场景出发，讲解产品结构与功能<br /> 2. 教学中涉及到的步骤文案说明，不同商品与型号标注清晰<br /> 3. 使用该商品完成的成果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50064102096.mp4',
        videoType: '评测教学',
      },
      {
        fee: 1500,
        desc:
          '1. 展示外观与内部结构展示<br /> 2. 主要功能与亮点讲解并且试用<br /> 3. 同类商品或者同款商品中不同色号之间对比',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50074550753.mp4',
        videoType: '功能讲解',
      },
    ],
  },
  {
    title: '萌宠',
    value: [
      {
        fee: 1000,
        desc:
          '1. 模特（宠物模特）展示各个角度，需要展示颜色款式与不同搭配<br /> 2. 街景或者棚内场景化拍摄<br /> 3. 细节和亮点部分特写拍摄，并有文案说明',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50004100213.mp4',
        videoType: '穿搭街拍',
      },
      {
        fee: 1600,
        desc:
          '1. 从某个具体使用场景出发，讲解产品结构与功能<br /> 2. 教学中涉及到的步骤文案说明，不同商品与型号标注清晰<br /> 3. 使用该商品完成的成果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50001108245.mp4',
        videoType: '评测教学',
      },
      {
        fee: 1500,
        desc:
          '1. 展示外观与内部结构<br /> 2. 主要功能讲解与掩饰，亮点功能讲解需要突出与同类产品的差异<br /> 3. 功能试用，展示效果',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50012826492.mp4',
        videoType: '功能与讲解',
      },
    ],
  },
  {
    title: '生活',
    value: [
      {
        fee: 1000,
        desc:
          '1. 外观与内部360度展示<br /> 2. 特写细节与质感，包括单不限于材质、五金件等<br /> 3. 有文案与讲解说明材质工艺的特殊性',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50072102766.mp4',
        videoType: '外观与工艺',
      },
      {
        fee: 1500,
        desc:
          '1. 从某个具体使用场景出发，讲解产品结构与功能<br /> 2. 教学中涉及到的步骤文案说明，不同商品与型号标注清晰<br />3. 使用该商品完成的成果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50043022518.mp4',
        videoType: '评测教学',
      },
      {
        fee: 1000,
        desc:
          '1. 展示外观与内部结构<br /> 2. 主要功能讲解与掩饰，亮点功能讲解需要突出与同类产品的差异<br /> 3. 功能试用，展示效果',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50061822417.mp4',
        videoType: '功能讲解',
      },
    ],
  },
  {
    title: '旅行',
    value: [
      {
        fee: 500,
        desc:
          '1. 外观与内部360度展示<br /> 2. 特写细节与质感，包括单不限于材质、五金件等<br /> 3. 有文案与讲解说明材质工艺的特殊性',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50074630889.mp4',
        videoType: '外观与工艺',
      },
      {
        fee: 1500,
        desc:
          '1. 从某个具体使用场景出发，讲解产品结构与功能<br /> 2. 教学中涉及到的步骤文案说明，不同商品与型号标注清晰<br /> 3. 使用该商品完成的成果展示',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50009662520.mp4',
        videoType: '评测教学',
      },
      {
        fee: 1500,
        desc:
          '1. 展示外观与内部结构<br /> 2. 主要功能讲解与掩饰，亮点功能讲解需要突出与同类产品的差异<br /> 3. 功能试用，展示效果',
        videoUrl:
          'http://cloud.video.taobao.com//play/u/1124755687/p/1/e/6/t/1/50012810934.mp4',
        videoType: '功能讲解',
      },
    ],
  },
];

export default class VideoList extends Component {
  static displayName = 'VideoList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      dialogVisible: false,
      dialogVideo: {},
    };
  }

  handleCateChange = (index) => {
    this.setState({
      index,
    });
  };

  handleOpen = (item) => {
    this.setState({
      dialogVisible: true,
      dialogVideo: item,
    });
  };

  handleColse = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  render() {
    return (
      <div style={styles.videoListContainer}>
        <ul style={styles.videoCate}>
          {data.map((item, index) => {
            const activeStyle =
              this.state.index === index ? styles.active : null;
            return (
              <li
                key={index}
                style={{ ...styles.videoCateItem, ...activeStyle }}
                onClick={() => this.handleCateChange(index)}
              >
                {item.title}
              </li>
            );
          })}
        </ul>

        <Row style={styles.videoList} gutter="20" wrap>
          {data[this.state.index].value.map((item, index) => {
            return (
              <Col xxs="24" s="12" l="8" key={index}>
                <div style={styles.videoCarditem}>
                  <div style={{ position: 'relative' }}>
                    <img
                      alt=""
                      src={require('./images/TB1E0sbmpmWBuNjSspdXXbugXXa-84-84.png')}
                      style={styles.playerIcon}
                    />
                    <video
                      src={item.videoUrl}
                      controls={false}
                      style={styles.video}
                      onClick={() => this.handleOpen(item)}
                    >
                      您的浏览器不支持播放该视频！
                    </video>
                  </div>

                  <div style={styles.videoInfo}>
                    <h5 style={styles.videoTitle}>{item.videoType}</h5>
                    <div style={styles.videoDesc}>
                      <div>服务包含内容：</div>
                      <div dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                    <div style={styles.videoFee}>
                      单支 ￥ <strong style={styles.fee}>{item.fee}</strong> 起
                    </div>
                    <a href="#" style={styles.videoLink}>
                      开始定制{' '}
                      <img
                        alt=""
                        src={require('./images/TB13yHPmrSYBuNjSspiXXXNzpXa-40-40.png')}
                        style={styles.arrowIcon}
                      />
                    </a>
                  </div>

                  <Dialog
                    visible={this.state.dialogVisible}
                    footer={false}
                    onClose={this.handleColse}
                    autoFocus={false}
                    closeable
                    className="video-dialog"
                  >
                    <video
                      src={this.state.dialogVideo.videoUrl}
                      controls
                      style={styles.dialogVideo}
                      webkit-playsinline="false"
                    >
                      您的浏览器不支持播放该视频！
                    </video>
                    <a
                      href="#"
                      style={{
                        ...styles.videoLink,
                        width: '166px',
                        height: '40px',
                        lineHeight: '40px',
                        bottom: '-60px',
                        top: 'auto',
                      }}
                    >
                      开始定制{' '}
                      <img
                        src={require('./images/TB13yHPmrSYBuNjSspiXXXNzpXa-40-40.png')}
                        style={styles.arrowIcon}
                        alt=""
                      />
                    </a>
                  </Dialog>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  videoListContainer: {
    margin: '20px 0',
  },
  videoCate: {
    margin: '0 10px',
    background: '#fff',
    padding: '0 14px',
    borderRadius: '4px',
  },
  videoCateItem: {
    display: 'inline-block',
    margin: '12px 4px',
    padding: '6px 18px',
    fontSize: '16px',
    color: '#666',
    cursor: 'pointer',
  },
  videoList: {
    margin: '20px 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  videoCarditem: {
    marginBottom: '20px',
    borderRadius: '4px',
    background: '#fff',
  },
  active: {
    color: '#FF5D38',
    border: '1px solid #FF5D38',
    borderRadius: '50px',
  },
  video: {
    display: 'block',
    width: '100%',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  dialogVideo: {
    width: '600px',
  },
  videoInfo: {
    position: 'relative',
    padding: '20px',
  },
  videoTitle: {
    margin: '0 0 10px',
    lineHeight: '32px',
    fontSize: '24px',
  },
  videoDesc: {
    padding: '0 0 20px',
    margin: '0 0 20px',
    fontSize: '14px',
    color: '#999',
    lineHeight: '20px',
    height: '120px',
    overflow: 'hidden',
  },
  videoFee: {
    position: 'absolute',
    bottom: '20px',
    fontSize: '14px',
  },
  fee: {
    fontSize: '18px',
  },
  videoLink: {
    position: 'absolute',
    top: '20px',
    right: '0',
    width: '124px',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    color: '#fff',
    background: '#FF5D38',
  },
  arrowIcon: {
    width: '20px',
    height: '20px',
    verticalAlign: 'middle',
    marginLeft: '4px',
    marginTop: '-2px',
  },
  playerIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '40px',
    height: '40px',
    marginLeft: '-20px',
    marginTop: '-20px',
  },
};
