import React, { Component } from 'react';
import ContainerCard from '../../../../components/ContainerCard';

const mockData = [
  {
    text: '查看所有',
    items: [
      {
        label: '产品 A',
        value: '62.4%',
      },
      {
        label: '产品 B',
        value: '15.0%',
      },
      {
        label: '产品 C',
        value: '62.4%',
      },
      {
        label: '产品 D',
        value: '5.0%',
      },
      {
        label: '产品 E',
        value: '4.5%',
      },
      {
        label: '产品 F',
        value: '2.3%',
      },
      {
        label: '产品 G',
        value: '1.7%',
      },
      {
        label: '产品 H',
        value: '1.5%',
      },
      {
        label: '产品 I',
        value: '1.4%',
      },
    ],
  },
];

export default class TopProducts extends Component {
  render() {
    return (
      <ContainerCard title="产品排名" contentStyle={{ padding: 0 }}>
        {mockData.map((data, index) => {
          return (
            <div style={styles.content} key={index}>
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
          );
        })}
      </ContainerCard>
    );
  }
}

const styles = {
  items: {
    marginBottom: '15px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #434857',
    padding: '10px 20px',
  },
  label: {
    color: '#fff',
  },
  value: {
    color: '#999',
  },
  button: {
    display: 'inline-block',
    border: '1px solid #1997C6',
    margin: '0 20px 20px',
    padding: '8px 10px',
    borderRadius: '6px',
  },
};
