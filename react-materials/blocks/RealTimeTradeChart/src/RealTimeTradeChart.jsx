import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';
import { Icon } from '@alifd/next';
import 'echarts/lib/chart/map';
import 'echarts/map/js/world';

const geoCoordMap = {
  '中国 · 浙江兰溪': [119.133, 29.12],
  尼日利亚仓: [-4.388361, 11.186148],
  美国洛杉矶仓: [-118.24311, 34.052713],
  香港邦泰仓: [114.195466, 22.282751],
  美国芝加哥仓: [-87.801833, 41.870975],

  加纳库马西仓: [-4.62829, 7.72415],
  英国曼彻斯特仓: [-1.657222, 51.886863],
  德国汉堡仓: [10.01959, 54.38474],

  哈萨克斯坦阿拉木图仓: [45.326912, 41.101891],

  俄罗斯伊尔库茨克仓: [89.116876, 67.757906],
  巴西仓: [-48.678945, -10.493623],
  埃及达米埃塔仓: [31.815593, 31.418032],
  西班牙巴塞罗纳仓: [2.175129, 41.385064],
  柬埔寨金边仓: [104.88659, 11.545469],
  意大利米兰仓: [9.189948, 45.46623],
  乌拉圭蒙得维的亚仓: [-56.162231, -34.901113],
  莫桑比克马普托仓: [32.608571, -25.893473],
  阿尔及利亚阿尔及尔仓: [3.054275, 36.753027],

  阿联酋迪拜仓: [55.269441, 25.204514],

  匈牙利布达佩斯仓: [17.108519, 48.179162],
  澳大利亚悉尼仓: [150.993137, -33.675509],
  美国加州仓: [-121.910642, 41.38028],
  澳大利亚墨尔本仓: [144.999416, -37.781726],
  墨西哥仓: [-99.094092, 19.365711],
  加拿大温哥华仓: [-123.023921, 49.311753],
};

const data = [
  {
    name: '中国 · 浙江兰溪',
    value: 10,
  },
  {
    name: '尼日利亚仓',
    value: 10,
  },
  {
    name: '美国洛杉矶仓',
    value: 20,
  },
  {
    name: '香港邦泰仓',
    value: 20,
  },
  {
    name: '美国芝加哥仓',
    value: 50,
  },
  {
    name: '加纳库马西仓',
    value: 64,
  },
  {
    name: '英国曼彻斯特仓',
    value: 68,
  },
  {
    name: '德国汉堡仓',
    value: 45,
  },
  {
    name: '哈萨克斯坦阿拉木图仓',
    value: 10,
  },
  {
    name: '俄罗斯伊尔库茨克仓',
    value: 10,
  },
  {
    name: '巴西仓',
    value: 20,
  },
  {
    name: '埃及达米埃塔仓',
    value: 50,
  },
  {
    name: '西班牙巴塞罗纳仓',
    value: 58,
  },
  {
    name: '柬埔寨金边仓',
    value: 64,
  },
  {
    name: '意大利米兰仓',
    value: 68,
  },
  {
    name: '乌拉圭蒙得维的亚仓',
    value: 45,
  },
  {
    name: '莫桑比克马普托仓',
    value: 50,
  },
  {
    name: '阿尔及利亚阿尔及尔仓',
    value: 58,
  },
  {
    name: '阿联酋迪拜仓',
    value: 64,
  },
  {
    name: '匈牙利布达佩斯仓',
    value: 68,
  },
  {
    name: '澳大利亚悉尼仓',
    value: 45,
  },
  {
    name: '美国加州仓',
    value: 68,
  },
  {
    name: '澳大利亚墨尔本仓',
    value: 45,
  },
  {
    name: '墨西哥仓',
    value: 45,
  },
  {
    name: '加拿大温哥华仓',
    value: 45,
  },
];

const v = [
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
];

function formtGCData(geoData, gcData, srcNam, dest) {
  const tGeoDt = [];
  gcData.map((value) => {
    if (srcNam !== value.name) {
      if (dest) {
        tGeoDt.push({
          coords: [geoData[srcNam], geoData[value.name]],
        });
      } else {
        tGeoDt.push({
          coords: [geoData[value.name], geoData[srcNam]],
        });
      }
    }
    return null;
  });
  return tGeoDt;
}

function formtVData(geoData, vData, srcNam) {
  const tGeoDt = [];
  for (let i = 0, len = vData.length; i < len; i++) {
    const tNam = vData[i].name;
    if (srcNam !== tNam) {
      tGeoDt.push({
        name: tNam,
        value: geoData[tNam],
        symbolSize: v[i],
        itemStyle: {
          normal: {
            color: '#FFD24D',
            borderColor: 'gold',
          },
        },
      });
    }
  }
  tGeoDt.push({
    name: srcNam,
    value: geoData[srcNam],
    symbolSize: 8,
    itemStyle: {
      normal: {
        color: '#4DFFFF',
        borderColor: '#fff',
      },
    },
  });
  return tGeoDt;
}

// var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
const planePath = 'arrow';

const option = {
  geo: {
    name: 'Enroll distribution',
    type: 'map',
    map: 'world',
    label: {
      emphasis: {
        show: false,
      },
    },
    itemStyle: {
      normal: {
        areaColor: '#022548',
        borderColor: '#0DABEA',
      },
      emphasis: {
        areaColor: '#011B34',
      },
    },
  },
  series: [
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.1,
        color: '#FFB973',
        symbol: planePath,
        symbolSize: 5,
      },
      lineStyle: {
        normal: {
          color: '#FFB973',
          width: 0,
          opacity: 0.2,
          curveness: 0,
        },
      },
      data: formtGCData(geoCoordMap, data, '中国 · 浙江兰溪', true),
    },
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.1,
        color: '#9CE6FE',
        symbol: planePath,
        symbolSize: 5,
      },
      lineStyle: {
        normal: {
          color: '#65A2C2',
          width: 0,
          opacity: 0.4,
          curveness: 0,
        },
      },
      data: formtGCData(geoCoordMap, data, '中国 · 浙江兰溪', false),
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        period: 4,
        scale: 4,
        brushType: 'stroke',
      },
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{b}',
        },
      },
      symbolSize: 5,
      itemStyle: {
        normal: {
          color: '#fff',
          borderColor: 'gold',
        },
      },
      data: formtVData(geoCoordMap, data, '中国 · 浙江兰溪'),
    },
  ],
};

/**
 * 图例参考：http://gallery.echartsjs.com/editor.html?c=xS197j1RtM
 */
export default class RealTimeTradeChart extends Component {
  static displayName = 'RealTimeTradeChart';

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
      date: `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    });
  };

  componentDidMount() {
    setInterval(this.updateDate, 1000);
  }

  render() {
    return (
      <IceContainer style={{ background: '#000' }}>
        <div style={styles.info}>
          <h1 style={styles.title}>某某某品牌 电商实时状况</h1>
          <p style={styles.time}>
            <Icon type="time" size="small" style={styles.timeIcon} />
            {this.state.date}
          </p>
          <p style={styles.subTitle}>今日交易额</p>
          <p style={styles.sum}>16828234,00亿元</p>
        </div>
        <ReactEcharts option={option} style={{ height: '500px' }} />
      </IceContainer>
    );
  }
}

const styles = {
  info: {
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '32px',
  },
  time: {
    fontSize: '18px',
    margin: '15px 0 25px',
  },
  subTitle: {
    width: '200px',
    lineHeight: '24px',
    margin: '0 auto',
    color: '#F8BC38',
    backgroundColor: '#1A484E',
    fontSize: '14px',
  },
  sum: {
    margin: '15px 0 0',
    lineHeight: '30px',
    fontSize: '38px',
    color: 'rgb(255, 246, 0)',
    fontWeight: 'bold',
  },
  timeIcon: {
    marginRight: '8px',
  },
};
