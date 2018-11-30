import React, { Component } from 'react';
import { Button, Step, Grid, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';

const dataSource = () => {
  return [
    {
      condition: '校验条件',
      validate: true,
      url: 'https://img.alicdn.com/tps/TB18NwoNFXXXXXoXXXXXXXXXXXX-132-132.png',
      operation: '查看',
      description:
        '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案',
    },
    {
      condition: '校验条件',
      validate: false,
      url: 'https://img.alicdn.com/tps/TB1VyMkNFXXXXc8XXXXXXXXXXXX-134-134.png',
      operation: '解决方式链接',
      description:
        '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案',
    },
    {
      condition: '身份认证',
      validate: true,
      url: 'https://img.alicdn.com/tps/TB1QCMfNFXXXXaOXpXXXXXXXXXX-136-136.png',
      operation: '查看',
      description:
        '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案',
    },
    {
      condition: '非卖家',
      validate: false,
      url: 'https://img.alicdn.com/tps/TB1mGnSNFXXXXbMaXXXXXXXXXXX-134-136.png',
      operation: '解决方式链接',
      description:
        '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案',
    },
    {
      condition: '18岁以上',
      validate: false,
      url: 'https://img.alicdn.com/tps/TB1xwQiNFXXXXcfXXXXXXXXXXXX-136-134.png',
      operation: '解决方式链接',
      description:
        '说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案说明以及解决方案',
    },
  ];
};

const { Row, Col } = Grid;

export default class ApplicationProgress extends Component {
  static displayName = 'ApplicationProgress';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    const data = dataSource();
    const { isMobile } = this.state;
    return (
      <div className="application-progress">
        <IceContainer>
          <Step current={0} type={isMobile ? 'dot' : 'circle'}>
            <Step.Item title="检测账号" />
            <Step.Item title="选择入住类型" />
            <Step.Item title="填写详细资料" />
            <Step.Item title="完成" />
          </Step>
          <div>
            {data.map((item, index) => {
              return (
                <div style={styles.row} key={index}>
                  <Row wrap>
                    <Col xxs="24" s="4">
                      <div style={styles.imageWrap}>
                        <img
                          style={styles.image}
                          src={item.url}
                          alt="condition"
                        />
                        <br />
                        <span>{item.condition}</span>
                      </div>
                    </Col>
                    <Col
                      xxs="24"
                      s="16"
                      style={{
                        ...styles.itemBody,
                        ...(isMobile && styles.mobileContentCenter),
                      }}
                    >
                      <span
                        style={
                          item.validate
                            ? styles.itemStatusSuccess
                            : styles.itemStatusFail
                        }
                      >
                        <Icon type={item.validate ? 'success' : 'error'} />
                        <span style={styles.itemStatusText}>
                          {item.validate ? '符合文案' : '不符合文案'}
                        </span>
                      </span>
                      <div
                        style={{
                          ...styles.itemDescription,
                          ...(isMobile && styles.removeContentWidth),
                        }}
                      >
                        {item.description}
                      </div>
                    </Col>
                    <Col xxs="24" s="4">
                      <div style={styles.operationWrap}>
                        <a href={item.url} target="_blank">
                          {item.operation}
                        </a>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
          <div style={styles.itemFooter}>
            <p>亲，您需要通过全部校验条件，才可以开通账号！</p>
            <Button style={styles.nextBtn} size="large" disabled>
              下一步
            </Button>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  row: {
    backgroundColor: '#f9f9f9',
    marginTop: '32px',
    padding: '20px 40px',
  },
  imageWrap: {
    textAlign: 'center',
  },
  image: {
    width: '64px',
    height: '64px',
    borderRadius: '50',
    marginBottom: '12px',
  },
  itemBody: {
    padding: '10px 50px 0',
  },
  itemDescription: {
    color: '#666',
    marginTop: '20px',
    maxWidth: '309px',
  },
  operationWrap: {
    marginTop: '40px',
    textAlign: 'center',
  },
  itemFooter: {
    textAlign: 'center',
    color: '#666',
    marginTop: '40px',
  },
  nextBtn: {
    marginTop: '40px',
  },
  itemStatusSuccess: {
    color: '#1be25c',
  },
  itemStatusFail: {
    color: '#f33',
    fontSize: '16px',
  },
  itemStatusText: {
    marginLeft: '10px',
  },
  mobileContentCenter: {
    textAlign: 'center',
    padding: '20px 0 0 0',
  },
  removeContentWidth: {
    maxWidth: 'none',
  },
};
