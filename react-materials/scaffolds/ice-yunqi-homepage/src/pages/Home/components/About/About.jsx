import React, { Component } from 'react';

const getData = () => {
  return Array.from({ length: 3 }).map((item, index) => {
    return {
      index: `0${index + 1}`,
      title: '云存储特惠',
      desc: '上云仅 <b>33元/年</b> ，降低企业成本',
      link: '#',
    };
  });
};

export default class About extends Component {
  static displayName = 'About';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.mainTitle}>ABOUT</div>
          <div style={styles.mainDesc}>关于阿里云</div>
          <div style={styles.tab}>
            <div
              style={{ ...styles.tabName, ...styles.first, ...styles.active }}
            >
              企业级
            </div>
            <div style={{ ...styles.tabName }}>个人级</div>
          </div>
          <div style={styles.items}>
            <div style={styles.tabWrap}>
              {getData().map((item) => {
                return (
                  <div style={styles.tabList} key={item.index}>
                    <div style={styles.left}>
                      <div style={styles.num}>{item.index}</div>
                      <div style={styles.title}>{item.title}</div>
                    </div>
                    <div style={styles.middle}>
                      <div
                        style={styles.desc}
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                    <div style={styles.btnBox}>
                      <a href={item.link} style={styles.btnLink}>
                        查看详情
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '50px 0',
    background: '#000',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
    position: 'relative',
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
  img: {
    marginTop: '70px',
    maxWidth: '100%',
  },
  tab: {
    position: 'absolute',
    right: '10px',
    top: '66px',
    overflow: 'hidden',
  },
  first: {
    marginTop: '0',
  },
  active: {
    color: '#fff',
    borderBottom: '1px solid #fff',
  },
  tabName: {
    float: 'left',
    cursor: 'pointer',
    fontSize: '26px',
    lineHeight: '30px',
    color: 'hsla(0,0%,100%,.5)',
    marginLeft: '30px',
    padding: '14px 0',
    borderBottom: '1px solid transparent',
    transition: 'all .3s',
  },
  items: {
    overflow: 'hidden',
    paddingTop: '50px',
  },
  tabList: {
    height: '80px',
    background: '#191a1e',
    position: 'relative',
    paddingRight: '40px',
    marginTop: '20px',
    transition: 'all .3s',
  },
  middle: {
    paddingLeft: '335px',
    paddingRight: '180px',
    height: '80px',
    overflow: 'hidden',
  },
  left: {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '80px',
    overflow: 'hidden',
  },
  num: {
    float: 'left',
    fontSize: '42px',
    width: '80px',
    height: '80px',
    lineHeight: '80px',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    background: '#236cff',
  },
  title: {
    float: 'left',
    maxWidth: '255px',
    fontSize: '20px',
    lineHeight: '80px',
    color: '#fff',
    paddingLeft: '40px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  desc: {
    fontSize: '14px',
    lineHeight: '24px',
    color: 'hsla(0,0%,100%,.8)',
    marginTop: '28px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  btnBox: {
    position: 'absolute',
    right: '40px',
    top: '20px',
  },
  btnLink: {
    display: 'inline-block',
    width: '160px',
    height: '40px',
    border: '1px solid #fff',
    lineHeight: '38px',
    fontSize: '16px',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all .3s',
  },
};
