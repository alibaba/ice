import React, { Component } from 'react';
import PieChart from './PieChart';
import TopList from './TopList';
import LineChart from './LineChart';
import Map from './Map';
import Title from './Title';

const data = {
  source: [
    {
      value: 335,
      name: '直接访问',
    },
    { value: 310,
      name: '邮件营销',
    },
    {
      value: 234,
      name: '联盟广告',
    },
    {
      value: 135,
      name: '视频广告',
    },
    {
      value: 1548,
      name: '搜索引擎',
    },
  ],
  topShop: [
    {
      name: '凑味咖啡鼓浪屿纯手工人气',
    },
    {
      name: '农味美食店',
    },
    {
      name: '爱生气起泡米酒',
    },
    {
      name: '黎平县原生态官方企业 ',
    },
    {
      name: '古蜀味道胡同里蒜蓉酱海鲜酱',
    },
  ],
  topItem: [
    {
      name: '起泡酒大礼包 爱格尼蓝海之鲸天使之手气泡酒',
    },
    {
      name: '一杯 精选气泡酒 Italy原瓶进口天使之手Moscato甜白葡萄微起泡酒',
    },
    {
      name: '精选红酒 炒鸡好喝的德国巧克力红酒250ml浓香丝滑爽爆',
    },
    {
      name: '【爱上红枣】爱生气红枣米酒冬酿鲜米酒低度女士甜酒果酒稠酒6瓶',
    },
    {
      name: '埃塞尔比亚水洗耶加雪菲Aricha G1瑰夏风味咖啡豆粉227g/凑味咖啡',
    },
  ],
  target: [
    {
      value: 67,
      name: '完成',
    },
    {
      value: 23,
      name: '未完成',
    },
  ],
  member: [
    {
      value: 335,
      name: 'v1',
    },
    {
      value: 310,
      name: 'v2',
    },
    {
      value: 234,
      name: 'v3',
    },
  ],
};

export default class DataAnalysis extends Component {
  static displayName = 'DataAnalysis';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }

  updateDate = () => {
    const date = new Date();
    this.setState({
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    });
  }

  componentDidMount() {
    setInterval(this.updateDate, 1000);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={styles.side}>
            <PieChart data={data.source} title="交易来源占比" />
            <TopList data={data.topShop} title="成交额top店铺" />
            <LineChart data={data.source} title="渠道销售排行" />
          </div>
          <div style={styles.middle}>
            <div style={styles.header}>
              <h1 style={styles.pageTitle}>实时交易状况</h1>
              <p style={styles.time}>{this.state.date}</p>
              <Title data="当前交易额" />
              <h2 style={styles.sum}>8999090.00</h2>
            </div>
          </div>
          <div style={styles.side}>
            <PieChart data={data.target} title="销售目标达成率" />
            <TopList data={data.topItem} title="成交额top商品" />
            <PieChart data={data.member} title="会员等级占比" />
          </div>
        </div>
        <div style={styles.bg}>
          <Map />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#2e323f',
    color: '#fff',
    position: 'relative',
  },
  main: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  side: {
    zIndex: 1,
    width: '320px',
    padding: '10px',
  },
  middle: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: '36px',
  },
  time: {
    marginBottom: 50,
  },
  sum: {
    marginTop: 30,
    color: '#fff600',
    fontSize: '70px',
  },
};
