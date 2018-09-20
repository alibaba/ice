import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';

const ScrollOverPack = ScrollAnim.OverPack;

const MOCK_DATA = [
  {
    title: 'Starry Galaxy 群星璀璨',
    desc:
      '技术突破疆域和引力限制，展现科技驱动下社会生活的繁荣生态全景，铁甲大战、品牌行星、舞台Battle，将云栖最会玩的创新精神贯彻到展览全程的每分每秒。',
    image: require('./images/slider1.png'),
  },
  {
    title: 'ATEC 金融科技',
    desc:
      '阿里巴巴集结地表最强黑科技，通过达摩院为核心，带动人工智能、IoT、生物识别等各大区块，以立足现在、眺望未来的方式，打造体验、沉浸、交互互相融合的震撼空间。',
    image: require('./images/slider2.png'),
  },
  {
    title: 'Space Station 空间站',
    desc:
      '共创新金融的集结号已经吹响！集中呈现如何将Techfin技术应用于医疗、农业、教育等领域，与合作伙伴一起探索如何推动社会的平等与可持续发展。更有工程师现场互动，手把手教你如何开发。',
    image: require('./images/slider2.png'),
  },
];

export default class Exhibition extends Component {
  static displayName = 'Exhibition';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  isSelected = (selected) => {
    return selected ? ' selected' : '';
  };

  onMouseEnter = (event) => {
    const { index } = event.currentTarget.dataset;
    const selectedIndex = parseInt(index, 10);
    if (!isNaN(selectedIndex)) {
      this.setState({
        selectedIndex,
      });
    }
  };

  getSelectedStyle = (selectedIndex, index) => {
    const selected = selectedIndex === index ? styles.selected : {};
    let selectedDesc = {};
    let selectedTitle = {};
    let selectedImage = {};
    if (Object.keys(selected).length !== 0 && selected.constructor === Object) {
      selectedDesc = styles.selectedDesc;
      selectedTitle = styles.selectedTitle;
      selectedImage = styles.selectedImage;
    }

    return {
      selected,
      selectedTitle,
      selectedDesc,
      selectedImage,
    };
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div style={styles.container}>
        <ScrollOverPack always={false}>
          <QueueAnim type="bottom" delay={100} duration={1000}>
            <div style={styles.content} key="content">
              <div style={styles.mainTitle}>EXHIBITION</div>
              <div style={styles.mainDesc}>创新互动展览</div>
              <div style={styles.items}>
                {MOCK_DATA.map((item, index) => {
                  const selectedStyle = this.getSelectedStyle(
                    selectedIndex,
                    index
                  );
                  return (
                    <a
                      href="#"
                      key={index}
                      style={{ ...styles.item, ...selectedStyle.selected }}
                      data-index={index}
                      onMouseEnter={this.onMouseEnter}
                    >
                      <img
                        style={{
                          ...styles.image,
                          ...selectedStyle.selectedImage,
                        }}
                        src={item.image}
                        alt=""
                      />
                      <h4
                        style={{
                          ...styles.title,
                          ...selectedStyle.selectedTitle,
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          ...styles.desc,
                          ...selectedStyle.selectedDesc,
                        }}
                      >
                        {item.desc}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          </QueueAnim>
        </ScrollOverPack>
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: '680px',
    padding: '50px 0',
    background: '#000',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  mainTitle: {
    fontSize: '60px',
    color: '#fff',
    letterSpacing: '0.77px',
    lineHeight: '72px',
    margin: '0',
    fontWeight: '700',
  },
  mainDesc: {
    fontSize: '24px',
    lineHeight: '30px',
    color: '#fff',
    marginTop: '8px',
    fontWeight: '700',
  },
  items: {
    marginTop: '70px',
    height: '400px',
  },
  item: {
    position: 'relative',
    width: '18.7%',
    height: '100%',
    float: 'left',
    overflow: 'hidden',
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s linear',
  },
  image: {
    position: 'relative',
    width: '1200px',
    height: '100%',
    left: '50%',
    marginLeft: '-600px',
    filter: 'grayscale(100%)',
    transition: 'all 0.3s linear',
  },
  title: {
    position: 'absolute',
    zIndex: '2',
    width: '100%',
    textAlign: 'center',
    top: '167px',
    fontSize: '26px',
    lineHeight: '1',
    opacity: '0.8',
    fontWeight: '400',
    margin: '0',
    padding: '0',
    transition: 'all 0.3s linear',
  },
  desc: {
    position: 'absolute',
    zIndex: '2',
    width: '547px',
    top: '148px',
    left: '73px',
    opacity: '0',
    fontSize: '14px',
    lineHeight: '22px',
    transition: 'all 0.3s linear',
  },
  selected: {
    width: '62.5%',
  },
  selectedImage: {
    filter: 'grayscale(0)',
  },
  selectedTitle: {
    opacity: '1',
    top: '108px',
    left: '72px',
    textAlign: 'left',
  },
  selectedDesc: {
    opacity: '1',
  },
};
