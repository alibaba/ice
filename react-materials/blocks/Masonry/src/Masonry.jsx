import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import Masonry from 'react-masonry-component';

const { Row, Col } = Grid;

const dataSource = [
  {
    img: require('./images/ice-design-analysis.png'),
    title: 'ice design analysis',
  },
  {
    img: require('./images/ice-design-cms.png'),
    title: 'ice design cms',
  },
  {
    img: require('./images/ice-design-dashboard.png'),
    title: 'ice design dashboard',
  },
  {
    img: require('./images/ice-design-ecommerce.png'),
    title: 'ice design ecommerce',
  },
  {
    img: require('./images/ice-open-platform.png'),
    title: 'ice open platform',
  },
  {
    img: require('./images/ice-website-homepage.png'),
    title: 'ice website homepage',
  },
  {
    img: require('./images/iceworks-homepage.png'),
    title: 'iceworks homepage',
  },
  {
    img: require('./images/ice-design-school.png'),
    title: 'ice design school',
  },
  {
    img: require('./images/ice-creator-landingpage.png'),
    title: 'ice creator landingpage',
  },
];

export default class CustomMasonry extends Component {
  static displayName = 'CustomMasonry';

  static propTypes = {
    dataSource: PropTypes.Array,
  };

  static defaultProps = {
    dataSource,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataSource } = this.props;
    const childElements = dataSource.map(function(item, index) {
      return (
        <Col l="4" key={index}>
          <div style={styles.itemBody}>
            <img src={item.img} style={styles.itemImg} alt="" />
            <h3 style={styles.itemTitle}>{item.title}</h3>
          </div>
        </Col>
      );
    });

    const masonryOptions = {
      transitionDuration: 0,
    };

    return (
      <IceContainer style={styles.container}>
        <Row wrap>
          <Masonry options={masonryOptions} style={{ width: '100%' }}>
            {childElements}
          </Masonry>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    background: '#F7F8FA',
  },
  itemBody: {
    margin: '10px',
    padding: '10px',
    background: '#fff',
    cursor: 'pointer',
  },
  itemImg: {
    maxWidth: '100%',
  },
  itemTitle: {
    margin: 0,
    padding: '10px 0 0',
    fontSize: '15px',
    textTransform: 'uppercase',
  },
};
