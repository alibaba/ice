import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { injectIntl } from 'react-intl';
import ContainerTitle from '../ContainerTitle';

const mockData = [
  {
    time: '2018-09-19 11:56:12',
    keywords: [
      {
        label: '合同关键字',
        value: '聘用合同',
      },
    ],
  },
  {
    time: '2018-09-21 18:26:36',
    keywords: [
      {
        label: '合同编号',
        value: '000001',
      },
      {
        label: '对方公司',
        value: '杭州xxx科技公司',
      },
    ],
  },
  {
    time: '2018-09-22 08:32:33',
    keywords: [
      {
        label: '合同编号',
        value: '000001',
      },
      {
        label: '申请单号',
        value: '94348394820',
      },
      {
        label: '负责人',
        value: '淘小宝',
      },
    ],
  },
];

@injectIntl
export default class SearchHistory extends Component {
  static displayName = 'SearchHistory';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleQuery = () => {
    this.props.fetchData();
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <IceContainer style={styles.container}>
        <ContainerTitle
          title={formatMessage({ id: 'app.general.history.title' })}
        />
        <div style={styles.historyList}>
          {mockData.map((item, index) => {
            return (
              <div style={styles.historyItem} key={index}>
                <div style={styles.itemInfo}>
                  <span style={styles.time}>{item.time}</span>
                  <span style={styles.query} onClick={this.handleQuery}>
                    再次查询
                  </span>
                </div>
                <div style={styles.keywords}>
                  {item.keywords.map((keyword, key) => {
                    return (
                      <div style={styles.keyword} key={key}>
                        <span style={styles.label}>{keyword.label}：</span>
                        <span style={styles.value}>{keyword.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
    minHeight: '100vh',
  },
  historyItem: {
    padding: '20px 20px 10px',
    borderBottom: '1px solid #f2f2f2',
  },
  itemInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '12px',
  },
  time: {
    color: 'rgba(0,0,0,.6)',
  },
  query: {
    cursor: 'pointer',
    color: 'rgba(49, 128, 253, 0.65)',
  },
  keyword: {
    display: 'inline-block',
    padding: '6px 10px',
    backgroundColor: 'rgba(31,56,88,0.06)',
    borderRadius: '3px',
    marginBottom: '8px',
    marginRight: '8px',
    maxWidth: '100%',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
};
