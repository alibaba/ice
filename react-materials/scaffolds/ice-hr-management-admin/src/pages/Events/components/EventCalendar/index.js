import React, { Component } from 'react';
import { Calendar } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class EventCalendar extends Component {
  dateCellRender = (calendarDate) => {
    const style = {
      position: 'absolute',
      width: 'calc(100% - 8px)',
      height: '2px',
      textAlign: 'center',
      background: '#ff0000',
      top: 0,
      left: 4,
    };

    return calendarDate.week() > 5 ? (
      <div>
        <span style={style} />
        {calendarDate.date()}
      </div>
    ) : (
      <div>{calendarDate.date()}</div>
    );
  };

  render() {
    return (
      <IceContainer title="待办事项">
        <Calendar dateCellRender={this.dateCellRender} />
      </IceContainer>
    );
  }
}
