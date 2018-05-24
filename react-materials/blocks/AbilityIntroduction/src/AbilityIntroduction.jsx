import { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const abilities = [
  {
    icon: 'https://gw.alicdn.com/tfs/TB1BY1osGmWBuNjy1XaXXXCbXXa-320-316.png',
    title: '框架',
    content: '熟悉的社区开发模式，彻底的组件化能力',
    link: '/framework/',
  },
  {
    icon: 'https://gw.alicdn.com/tfs/TB1AY1osGmWBuNjy1XaXXXCbXXa-320-316.png',
    title: '组件',
    content: '为开发者提供了一系列基础组件，通过组件组合进行高效开发',
    link: '/components/',
  },
  {
    icon: 'https://gw.alicdn.com/tfs/TB1uzsTsv9TBuNjy0FcXXbeiFXa-320-316.png',
    title: 'API',
    content: '手机淘宝能力支持和保障',
    link: '/api/',
  },
];

export default class AbilityIntroduction extends Component {
  renderAblities(abilities) {
    return abilities.map(({ icon, title, content, link }, idx) => {
      return (
        <Col xxs="24" l="8" style={styles.item} key={idx}>
          <img src={icon} style={{ width: '160px', height: '160px' }} />
          <div style={{ fontSize: '24px', color: '#333', marginBottom: '6px' }}>
            {title}
          </div>
          <div
            style={{
              width: '182px',
              fontSize: '16px',
              color: '#6D7A82',
              marginBottom: '30px',
              lineHeight: '1.7em',
            }}
          >
            {content}
          </div>
          <a href={link} style={{ color: '#00B0CF', fontSize: '16px' }}>
            了解更多
            <div
              style={{
                background: '#00B0CF',
                width: '26px',
                height: '26px',
                borderRadius: '13px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <div
                style={{
                  marginLeft: '5px',
                  display: 'inline-block',
                  marginLeft: '-3.53553px', // -10 * sqrt(2) / 4
                  width: '10px',
                  height: '10px',
                  borderRight: '1px solid #fff',
                  borderBottom: '1px solid #fff',
                  transform: 'rotate(-45deg)',
                }}
              />
            </div>
          </a>
        </Col>
      );
    });
  }
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.title}>我们的能力</div>
        <div style={styles.subtitle}>&lt; Distinguishing Feature &gt;</div>
        <Row wrap style={styles.group}>
          {this.renderAblities(abilities)}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fafafa',
    padding: '70px 70px 140px',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '48px',
    whiteSpace: 'nowrap',
    marginBottom: '10px',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
};
