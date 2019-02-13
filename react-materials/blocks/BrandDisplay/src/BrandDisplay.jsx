import React, { Component } from 'react';
import Img from '@icedesign/img';
import { Grid } from '@alifd/next';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;

const dataSource = [
  {
    title: '飞利浦',
    subject:
      '一场内容营销活动获得超百万的进店点击，定位新广告的达人+积极迎接内容时代的品牌，如何刷新内容营销的定义？',
    headPic: require('./images/TB1QMwlSXXXXXaUXXXXXXXXXXXX-122-122.png'),
    pic: require('./images/TB1n6H_SXXXXXc3XpXXXXXXXXXX-616-348.png'),
    url: 'https://alibaba.github.io/ice',
  },
  {
    title: '万家乐',
    subject:
      '策划『生活改造家』主题全案，联合一线大咖制作图文、直播、短视频全域引流，助力品牌升级和高端人群种草，结合行业活动割草。',
    headPic: require('./images/TB1Z4CLSXXXXXcHXVXXXXXXXXXX-61-61.png'),
    pic: require('./images/TB1bHO6SXXXXXaiXFXXXXXXXXXX-308-174.png'),
    url: 'https://alibaba.github.io/ice',
  },
  {
    title: '职场游乐园',
    subject: '2017年以“职场游乐园”为主题，全方位推动Lee牛仔专家与创新者形象。',
    headPic: require('./images/TB1kX62SXXXXXXJXVXXXXXXXXXX-122-122.png'),
    pic: require('./images/TB17bzrSXXXXXbpaFXXXXXXXXXX-616-348.png'),
    url: 'https://alibaba.github.io/ice',
  },
  {
    title: '品味百味人生',
    subject:
      '吃货的世界你不懂，看着直播镜头里心仪的零食恨不得舔屏，从种草到剁手分分钟一气呵成。',
    headPic: require('./images/TB19C_9SXXXXXc1XpXXXXXXXXXX-122-122.png'),
    pic: require('./images/TB1IkEjSXXXXXb1XXXXXXXXXXXX-616-348.png'),
    url: 'https://alibaba.github.io/ice',
  },
];

export default class BrandDisplay extends Component {
  static displayName = 'BrandDisplay';

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    const { isMobile } = this.state;
    const logoWidth = isMobile ? 150 : 195;
    const logoHeight = isMobile ? 150 : 175;

    return (
      <div className="brand-display" style={styles.container}>
        <div style={styles.brandHeader}>
          <h5 style={styles.brandTitle}>品牌展示</h5>
        </div>
        <Row gutter="20" wrap>
          {dataSource.map((item, index) => {
            return (
              <Col xxs="24" s="12" l="12" key={index} style={styles.brandItem}>
                <a href={item.url} style={styles.brandItemContent}>
                  <div>
                    <Img
                      width={logoWidth}
                      height={logoHeight}
                      src={item.pic}
                      type="cover"
                      alt="图片"
                    />
                  </div>
                  <div style={styles.caseContent}>
                    <div style={styles.caseSubject}>
                      <img
                        src={item.headPic}
                        style={styles.subjectImage}
                        alt="图片"
                      />
                      <span style={styles.subjectDesc}>{item.title}</span>
                    </div>
                    <p style={styles.caseDetail}>{item.subject}</p>
                  </div>
                </a>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 20px',
  },
  brandHeader: {
    position: 'relative',
    textAlign: 'center',
  },
  brandTitle: {
    marginBottom: '40px',
    fontSize: '20px',
    color: '#333333',
  },
  brandItem: {
    height: '175px',
    background: '#fff',
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: '30px',
    overflow: 'hidden',
  },
  brandItemContent: {
    display: 'flex',
  },

  caseContent: {},
  caseSubject: {
    margin: '0 10px 0',
    lineHeight: '60px',
    height: '60px',
  },
  subjectImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
  },
  subjectDesc: {
    fontSize: '16px',
    color: '#333333',
    height: '60px',
    verticalAlign: 'top',
    marginLeft: '12px',
  },
  caseDetail: {
    marginTop: 0,
    fontSize: '12px',
    color: '#666666',
    padding: '0 16px',
    textAlign: 'left',
  },
};
