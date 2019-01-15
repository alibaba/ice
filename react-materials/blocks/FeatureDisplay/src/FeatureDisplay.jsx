import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const data = [
  {
    title: '虚拟主机-入门版',
    description:
      '1G 磁盘空间；10G 流量；100M 带宽；PHP/Python/Ruby 支持；MySQL/PgSQL 支持；支持 1 站点；免费自动安装SSL证书；免费安装/搬家网站',
    imgUrl: require('./images/TB1RBTKi4rI8KJjy0FpXXb5hVXa-456-456.png'),
  },
  {
    title: '虚拟主机-大流量',
    description:
      '5G 磁盘空间；50G 流量；100M 带宽；PHP/Python/Ruby 支持；MySQL/PgSQL 支持；支持 5 站点；免费自动安装SSL证书；免费安装/搬家网站',
    imgUrl: require('./images/TB1LN_Ai9_I8KJjy0FoXXaFnVXa-450-453.png'),
  },
  {
    title: '虚拟主机-高速洛杉矶',
    description:
      '20G 磁盘空间；50G 流量；100M 带宽；PHP/Python/Ruby 支持；MySQL/PgSQL 支持；支持 1 站点；免费自动安装SSL证书；免费安装/搬家网站',
    imgUrl: require('./images/TB1K3JmgOqAXuNjy1XdXXaYcVXa-450-450.png'),
  },
  {
    title: '洛杉矶 OVZ-VPS',
    description:
      '10G 磁盘空间；1/512M CPU/内存；50M 带宽；1独立 IPV4；2G DDOS防御；300G 流量；免费安装管理面板',
    imgUrl: require('./images/TB124gfiY_I8KJjy1XaXXbsxpXa-450-453.png'),
  },
  {
    title: '洛杉矶 KVM-VPS',
    description:
      '15G 磁盘空间；1/1024M CPU/内存；50M 带宽；1独立 IPV4；2G DDOS防御；500G 流量；免费安装管理面板',
    imgUrl: require('./images/TB1s4T4i2DH8KJjy1XcXXcpdXXa-450-450.png'),
  },
  {
    title: '云电商系统',
    description:
      '微信商城/PC商城（增值）；会员粉丝动态管理；全网订单处理；智慧仓库管理；电脑、平板、手机，多终端收银；自动售货机交互屏多种支撑硬件；终身免费技术指导',
    imgUrl: require('./images/TB1oEe3i8fH8KJjy1XbXXbLdXXa-453-453.png'),
  },
];

export default class FeatureDisplay extends Component {
  static displayName = 'FeatureDisplay';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="feature-display" style={styles.container}>
        <div style={styles.items}>
          <Row gutter="20" wrap>
            {data.map((item, index) => {
              return (
                <Col key={index} xxs="24" s="12" l="8">
                  <div style={styles.item}>
                    <img src={item.imgUrl} style={styles.image} alt="" />
                    <h3 style={styles.title}>{item.title}</h3>
                    <p style={styles.description}>{item.description}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '0 80px',
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    textAlign: 'center',
    padding: '0 30px',
    margin: '40px 0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  },
  description: {
    fontSize: '13px',
    lineHeight: '22px',
    color: '#999',
  },
};
