/* eslint react/no-children-prop:0 */
import React, { Component } from 'react';
import { Icon } from '@alifd/next';
import TextLoop from 'react-text-loop';
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
    {
      value: 310,
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
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    this.setState({
      date: `${year}-${month + 1}-${day} ${hour}:${
        minute < 10 ? `0${minute}` : minute
      }:${second < 10 ? `0${second}` : second}`,
    });
  };

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
              <h1 style={styles.pageTitle}>某某某品牌 电商实时状况</h1>
              <p style={styles.time}>
                <Icon type="clock" size="xs" /> {this.state.date}
              </p>
              <Title data="今日交易额" />
              <h2 style={styles.sum}>
                1682
                <TextLoop
                  speed={1000}
                  children={['1242.12', '5356.32', '6518.28', '8739.69']}
                />
                元
              </h2>
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
    backgroundColor: '#000',
    color: '#fff',
    position: 'relative',
    height: '100vh',
  },
  main: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
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
    position: 'relative',
    zIndex: 9,
    textAlign: 'center',
  },
  pageTitle: {
    fontSize: '36px',
    margin: 0,
  },
  time: {
    marginBottom: 20,
  },
  sum: {
    height: '44px',
    lineHeight: '44px',
    margin: '25px 0 0',
    color: '#f7d947',
    fontSize: '62px',
    fontWeight: 400,
  },
};
