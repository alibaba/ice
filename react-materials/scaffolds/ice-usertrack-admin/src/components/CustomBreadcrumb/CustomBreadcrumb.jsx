import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '@alifd/next';

export default class CustomBreadcrumb extends Component {
  static displayName = 'CustomBreadcrumb';

  static propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  render() {
    const { title, items, summary } = this.props;
    return (
      <div style={styles.container}>
        <Breadcrumb style={styles.breadcrumb}>
          {items.map((item, index) => {
            const link = item.link ? { link: item.link } : {};
            return (
              <Breadcrumb.Item key={index} {...link}>
                {item.text}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <h3 style={styles.title}>{title}</h3>
        {summary && <p style={styles.summary}>{summary}</p>}
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fff',
    padding: '20px 20px 0',
    borderBottom: '1px solid #e8e8e8',
  },
  breadcrumb: {
    margin: '0 0 20px',
  },
  title: {
    margin: '0 0 20px',
    fontSize: '20px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  summary: {
    marginBottom: '20px',
    fontSize: '14px',
    lineHeight: '1.5',
    color: 'rgba(0, 0, 0, 0.65)',
  },
};
