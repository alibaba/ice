import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const mockData = [
  {
    title: 'Countries',
    text: 'All countries',
    items: [
      {
        label: 'United States',
        value: '62.4%',
      },
      {
        label: 'India',
        value: '15.0%',
      },
      {
        label: 'United Kinddom',
        value: '62.4%',
      },
      {
        label: 'Canada',
        value: '5.0%',
      },
      {
        label: 'Russia',
        value: '4.5%',
      },
      {
        label: 'Mexico',
        value: '2.3%',
      },
      {
        label: 'Spain',
        value: '1.7%',
      },
      {
        label: 'France',
        value: '1.5%',
      },
      {
        label: 'South Africa',
        value: '1.4%',
      },
      {
        label: 'Japan',
        value: '1.2%',
      },
    ],
  },
  {
    title: 'Most visited pages',
    text: 'View all pages',
    items: [
      {
        label: '/logout',
        value: '3,929,481',
      },
      {
        label: '/signin',
        value: '1,143,393',
      },
      {
        label: '/logout',
        value: '938,287',
      },
      {
        label: '/tour',
        value: '749,393',
      },
      {
        label: '/features',
        value: '695,912',
      },
      {
        label: '/contact',
        value: '501,938',
      },
      {
        label: '/about',
        value: '392,381',
      },
      {
        label: '/profile',
        value: '203,338',
      },
      {
        label: '/price',
        value: '93,382',
      },
      {
        label: '/product',
        value: '87,985',
      },
    ],
  },
  {
    title: 'Devices and resolutions',
    text: 'View all devices',
    items: [
      {
        label: 'Desktop(1920x1080)',
        value: '3,929,481',
      },
      {
        label: 'Desktop(1366x768)',
        value: '1,143,393',
      },
      {
        label: 'Desktop(1440x900)',
        value: '938,287',
      },
      {
        label: 'Desktop(1280x800)',
        value: '749,393',
      },
      {
        label: 'Tablet(1024x768)',
        value: '695,912',
      },
      {
        label: 'Tablet(768x1024)',
        value: '501,938',
      },
      {
        label: 'Phone(320x480)',
        value: '392,381',
      },
      {
        label: 'Phone(720x450)',
        value: '203,338',
      },
      {
        label: 'Desktop(2560x1080)',
        value: '93,382',
      },
      {
        label: 'Desktop(2560x1600)',
        value: '87,985',
      },
    ],
  },
];

export default class CardList extends Component {
  static displayName = 'CardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter="20" style={styles.container}>
        {mockData.map((data, index) => {
          return (
            <Col l="12" key={index}>
              <div style={styles.content}>
                <h2 style={styles.title}>{data.title}</h2>
                <ul style={styles.items}>
                  {data.items.map((item, idx) => {
                    return (
                      <li style={styles.item} key={idx}>
                        <span style={styles.label}>{item.label}</span>
                        <span style={styles.value}>{item.value}</span>
                      </li>
                    );
                  })}
                </ul>
                <a href="#" style={styles.button}>
                  {data.text}
                </a>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  content: {
    marginBottom: '40px',
  },
  title: {
    margin: '0',
    padding: '10px 20px',
    color: '#fff',
    border: '1px solid #434857',
    borderRadius: '3px 3px 0 0',
  },
  items: {
    marginBottom: '15px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #434857',
    borderLeft: '1px solid #434857',
    borderRight: '1px solid #434857',
    padding: '10px 20px',
    borderRadius: '3px',
  },
  label: {
    color: '#BFC1C9',
  },
  value: {
    color: '#999',
  },
  button: {
    display: 'inline-block',
    border: '1px solid #1997C6',
    padding: '8px 10px',
    borderRadius: '3px',
  },
};
