import React, { Component } from 'react';
import { Table, Icon, Pagination, Balloon } from '@alifd/next';
import Ellipsis from '@icedesign/ellipsis';
import styles from './Schedule.module.scss'
import './Schedule.scss';


const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      id: index + 1,
      name: { zh: '生活大爆炸', en: 'The Big Bang Theory' },
      origin: {
        director: '马克·森卓斯基',
        actor: '吉姆·帕森斯',
        company: '哥伦比亚广播公司',
      },
      type: '喜剧 / 爱情',
      dayReturns: {
        returns: '888.8万',
        ratio: '10%',
      },
      accReturns: '9.99亿',
      date: '2017-09-25',
      score: '9.5',
    };
  });
};

export default class Schedule extends Component {
  static displayName = 'Schedule';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isLoading: false,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  mockApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData());
      }, 600);
    });
  };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi().then((data) => {
          this.setState({
            dataSource: data,
            isLoading: false,
          });
        });
      }
    );
  };

  /**
   * 页码发生改变时的回调函数
   */
  handleChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.fetchData();
      }
    );
  };

  renderId = (value, index) => {
    const ranking = {
      1: { color: 'red' },
      2: { color: 'rgba(255, 0, 0, 0.8)' },
      3: { color: 'rgba(255, 0, 0, 0.6)' },
    };
    return (
      <div className={styles.ranking} style={ranking[index + 1]}>
        NO.
        {value}
      </div>
    );
  };

  renderName = (value) => {
    return (
      <div className={styles.name}>
        <div className={styles.zh}>{value.zh}</div>
        <div className={styles.en}>{value.en}</div>
      </div>
    );
  };

  renderDayReturns = (value) => {
    return (
      <div className={styles.dayReturns}>
        <div className={styles.returns}>{value.returns}</div>
        <div className={styles.ratio}>
          <Icon type="arrow-up-filling" size="xs" className={styles.arrowUpIcon} />
          上涨
          {value.ratio}
        </div>
      </div>
    );
  };

  renderOrigin = (value) => {
    const Info = (ellipsis = false) => {
      return (
        <div className={styles.origin}>
          <div className={styles.director}>
            导演：
            {value.director}
          </div>
          <div className={styles.actor}>
            主演：
            {value.actor}
          </div>
          <div className={styles.company}>
            {ellipsis ? (
              <Ellipsis
                showTooltip={false}
                lineLimit={1}
                text={`发行公司：${value.company}`}
              />
            ) : (
              `发行公司：${value.company}`
            )}
          </div>
        </div>
      );
    };
    return (
      <Balloon
        trigger={Info(true)}
        align="r"
        alignEdge
        triggerType="click"
        closable={false}
        style={{ width: 300 }}
      >
        <div className={styles.balloonContent}>
          <h3 className={styles.balloonTitle}>详细信息</h3>
          {Info()}
        </div>
      </Balloon>
    );
  };

  renderScore = (value) => {
    return <div className={styles.score}>{value}</div>;
  };

  render() {
    const { dataSource, isLoading } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <h3 className={styles.title}>2018年10月01日票房</h3>
          <p className={styles.desc}>更新时间：2018年10月01日 12：00</p>
        </div>
        <div className={styles.summary}>全国单日总票房：100 亿</div>
        <Table
          dataSource={dataSource}
          loading={isLoading}
          className="custom-table"
          style={{ minHeight: '400px' }}
        >
          <Table.Column
            align="center"
            title="排名"
            dataIndex="id"
            cell={this.renderId}
          />
          <Table.Column
            align="center"
            title="影片名称"
            dataIndex="name"
            cell={this.renderName}
          />
          <Table.Column
            align="center"
            title="影片出品"
            dataIndex="origin"
            cell={this.renderOrigin}
          />
          <Table.Column align="center" title="影片类型" dataIndex="type" />
          <Table.Column
            align="center"
            title="日票房"
            dataIndex="dayReturns"
            cell={this.renderDayReturns}
          />
          <Table.Column
            align="center"
            title="累计票房"
            dataIndex="accReturns"
          />
          <Table.Column align="center" title="上映日期" dataIndex="date" />
          <Table.Column
            align="center"
            title="评分"
            dataIndex="score"
            cell={this.renderScore}
          />
        </Table>
        <Pagination
          className={styles.pagination}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

