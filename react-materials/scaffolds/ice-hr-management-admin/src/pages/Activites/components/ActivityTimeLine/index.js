import React, { Component } from 'react';
import { Timeline } from '@alifd/next';
import IceContainer from '@icedesign/container';
import data from './data';

const { Item: TimelineItem } = Timeline;

export default class Activites extends Component {
  renderAvatar = (items) => {
    return (
      <div>
        {items.map((item, index) => {
          return <img src={item} alt="" key={index} style={styles.avatar} />;
        })}
      </div>
    );
  };

  renderContent = (content) => {
    return (
      <div style={styles.content}>
        <p style={styles.time}>{content.time}</p>
        <p style={styles.desc}>{content.desc}</p>
        {this.renderAvatar(content.avatar)}
      </div>
    );
  };

  render() {
    return (
      <IceContainer title="动态列表">
        <Timeline>
          {data.map((item, index) => {
            return (
              <TimelineItem
                key={index}
                title={item.title}
                content={this.renderContent(item.content)}
                state={item.state}
              />
            );
          })}
        </Timeline>
      </IceContainer>
    );
  }
}

const styles = {
  content: {
    marginBottom: '80px',
  },
  desc: {
    margin: '10px 0',
    color: '#666',
  },
  avatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50px',
    border: '2px solid #fff',
    boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.2)',
  },
};
