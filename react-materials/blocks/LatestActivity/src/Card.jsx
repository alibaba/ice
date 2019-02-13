import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import RankList from './RankList';

const { Row, Col } = Grid;

export default class Card extends Component {
  static displayName = 'Card';

  static propTypes = {
    content: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.array.isRequired,
    link: PropTypes.object.isRequired,
  };

  render() {
    const { title, summary, link } = this.props;
    return (
      <IceContainer style={styles.container}>
        <Row>
          <Col l="18" style={styles.content}>
            <div style={styles.head}>
              <h3 style={styles.title}>{title}</h3>
              <div style={styles.summary}>
                {summary.map((item, key) => {
                  return (
                    <div style={styles.item} key={key}>
                      <span style={styles.itemLabel}>{item.label}</span>
                      <span style={styles.itemValue}>{item.value}</span>
                    </div>
                  );
                })}
              </div>
              <a href={link.href} style={styles.link}>
                {link.text}
              </a>
            </div>
            {this.props.content}
          </Col>
          <Col l="6">
            <RankList {...this.props} />
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  content: {
    borderRight: '1px solid #f0f0f0',
    padding: '20px',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    margin: '0',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
  summary: {
    display: 'flex',
    marginLeft: '20px',
    fontSize: '13px',
  },
  item: {
    marginRight: '15px',
  },
  itemLabel: {
    color: '#9B9B9B',
    marginRight: '6px',
  },
  itemValue: {
    color: '#4990E2',
  },
  link: {
    position: 'absolute',
    right: '20px',
    color: '#4990E2',
    fontSize: '13px',
  },
};
