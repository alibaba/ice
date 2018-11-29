import React, { Component } from 'react';
import { Table, Icon, Pagination, Balloon, Card } from '@icedesign/base';
import Ellipsis from '@icedesign/ellipsis';
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
    };
  }

  /**
   * 页码发生改变时的回调函数
   */
  handleChange = (current) => {
    this.setState({
      current,
    });
  };

  renderId = (value, index) => {
    const ranking = {
      1: { color: '#ee706d' },
      2: { color: '#f7da47' },
      3: { color: '#58ca9a' },
    };
    return (
      <div style={{ ...styles.ranking, ...ranking[index + 1] }}>
        NO.
        {value}
      </div>
    );
  };

  renderName = (value) => {
    return (
      <div style={styles.name}>
        <div style={styles.zh}>{value.zh}</div>
        <div style={styles.en}>{value.en}</div>
      </div>
    );
  };

  renderDayReturns = (value) => {
    return (
      <div style={styles.dayReturns}>
        <div style={styles.returns}>{value.returns}</div>
        <div style={styles.ratio}>
          <Icon type="arrow-up-filling" size="xs" style={styles.arrowUpIcon} />
          上涨
          {value.ratio}
        </div>
      </div>
    );
  };

  renderOrigin = (value) => {
    const Info = (ellipsis = false) => {
      return (
        <div style={styles.origin}>
          <div style={styles.director}>
            导演：
            {value.director}
          </div>
          <div style={styles.actor}>
            主演：
            {value.actor}
          </div>
          <div style={styles.company}>
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
        alignment="edge"
        triggerType="click"
        closable={false}
        style={{ width: 300 }}
      >
        <div style={styles.balloonContent}>
          <h3 style={styles.balloonTitle}>详细信息</h3>
          {Info()}
        </div>
      </Balloon>
    );
  };

  renderScore = (value) => {
    return <div style={styles.score}>{value}</div>;
  };

  render() {
    const dataSource = getData();

    return (
      <div style={styles.container}>
        <div style={styles.head}>
          <h3 style={styles.title}>2018年10月01日票房</h3>
          <p style={styles.desc}>更新时间：2018年10月01日 12：00</p>
        </div>
        <div style={styles.summary}>全国单日总票房：100 亿</div>
        <Table dataSource={dataSource} className="custom-table">
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
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const styles = {
  head: {
    marginBottom: '20px',
    padding: '15px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  title: {
    margin: '0 0 5px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
  desc: {
    margin: '0',
    color: '#999',
    fontSize: '12px',
  },
  balloonTitle: {
    margin: '0 0 15px',
    paddingLeft: '10px',
    borderLeft: '4px solid #2f7dfa',
    fontWeight: '500',
  },
  ranking: {
    fontSize: '15px',
    fontWeight: '500',
  },
  zh: {
    marginBottom: '10px',
  },
  origin: {
    textAlign: 'left',
  },
  director: {
    marginBottom: '10px',
  },
  actor: {
    marginBottom: '10px',
  },
  summary: {
    marginBottom: '20px',
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
  returns: {
    marginBottom: '10px',
  },
  arrowUpIcon: {
    color: 'red',
    marginRight: '5px',
  },
  score: {
    color: '#5e83fb',
    fontSize: '15px',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
