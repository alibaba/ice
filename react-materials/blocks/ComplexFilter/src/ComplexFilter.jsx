import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select, Grid } from '@alifd/next';
import './ComplexFilter.scss';

const { Row, Col } = Grid;
const {
  Option
} = Select;

export default class ComplexFilter extends Component {
  static displayName = 'ComplexFilter';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentFilterType: 'article',
      categories: ['type1', 'type3'],
    };
  }

  render() {
    const { currentFilterType, categories } = this.state;
    const FILTERS = [
      { type: 'article', text: '文章' },
      { type: 'app', text: '应用' },
      { type: 'other', text: '其他' },
    ];

    const CATEGORIES = [
      { type: 'all', text: '全部' },
      { type: 'type1', text: '类目一' },
      { type: 'type2', text: '类目二' },
      { type: 'type3', text: '类目三' },
      { type: 'type4', text: '类目四' },
    ];
    return (
      <div className="complex-filter">
        <IceContainer style={styles.tabFilterContainer}>
          {FILTERS.map((item, idx) => (
            <div
              key={idx}
              className={`tab-filter-item ${
                currentFilterType === item.type ? 'active' : ''
              }`}
              onClick={() => {
                this.setState({
                  currentFilterType: item.type,
                });
              }}
            >
              {item.text}
            </div>
          ))}
        </IceContainer>

        <IceContainer>
          <div style={styles.filterBelonging}>
            <span style={styles.filterBelongingLabel}>所属类目：</span>
            {CATEGORIES.map((cat, idx) => (
              <span
                className={`filter-belonging-item ${
                  categories.indexOf(cat.type) > -1 ? 'active' : ''
                }`}
                onClick={() => {
                  const isInCategory = categories.indexOf(cat.type) > -1;
                  if (isInCategory) {
                    this.setState({
                      categories: categories.filter(
                        (item) => item !== cat.type
                      ),
                    });
                  } else {
                    this.setState({
                      categories: [...categories, cat.type],
                    });
                  }
                }}
                key={idx}
              >
                {cat.text}
              </span>
            ))}
          </div>

          <Row wrap style={styles.filterForm}>
            <Col xxs={24} s={8} style={styles.col}>
              所有者：
              <Select
                style={styles.combobox}
                defaultValue={["卓凌"]}
                mode="tag"
                onBlur={() => console.log('blur')} />
            </Col>

            <Col xxs={24} s={8} style={styles.col}>
              活跃用户：
              <Select style={styles.select}>
                <Option value="">空</Option>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="andy">Andy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
              </Select>
            </Col>

            <Col xxs={24} s={8} style={styles.col}>
              好评度：
              <Select style={styles.select}>
                <Option value="">空</Option>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="andy">Andy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
              </Select>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  tabFilterContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 0,
  },
  filterBelonging: { paddingBottom: '10px', borderBottom: '1px solid #F4F4F4' },
  filterBelongingLabel: {
    fontSize: '14px',
    color: '#333',
    marginRight: '19px',
  },
  filterForm: {
    marginTop: '20px',
  },
  combobox: { width: '200px', marginRight: '25px' },
  select: { width: '50px', marginRight: '25px' },
  col: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
};
