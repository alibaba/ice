import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import { injectIntl } from 'react-intl';
import IceContainer from '@icedesign/container';
import ContainerTitle from './components/ContainerTitle';
import ContractTable from './components/ContractTable';
import SearchFilter from './components/SearchFilter';
import SearchHistory from './components/SearchHistory';

const { Row, Col } = Grid;

const mockData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      id: `00000${index}`,
      name: '聘用合同',
      ourCompany: '杭州xxx科技公司',
      amount: '999,999',
      currency: 'CNY',
      state: '签约中',
    };
  });
};

@injectIntl
export default class GeneralTable extends Component {
  static displayName = 'GeneralTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  mockApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData());
      }, 600);
    });
  };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi().then((dataSource) => {
          this.setState({
            dataSource,
            isLoading: false,
          });
        });
      }
    );
  };

  render() {
    const { isLoading, dataSource } = this.state;
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <Row gutter={20} wrap>
        <Col l="18">
          <IceContainer style={{ padding: '0' }}>
            <ContainerTitle
              title={formatMessage({ id: 'app.general.table.title' })}
            />
            <div style={{ padding: '20px' }}>
              <SearchFilter fetchData={this.fetchData} />
              <ContractTable
                isLoading={isLoading}
                dataSource={dataSource}
                fetchData={this.fetchData}
              />
            </div>
          </IceContainer>
        </Col>
        <Col l="6">
          <SearchHistory fetchData={this.fetchData} />
        </Col>
      </Row>
    );
  }
}
