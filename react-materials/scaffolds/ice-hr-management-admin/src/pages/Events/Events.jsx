import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import EventCalendar from './components/EventCalendar';
import NewEvent from './components/NewEvent';
import EventList from './components/EventList';

const { Row, Col } = Grid;

export default class Events extends Component {
  render() {
    return (
      <Row gutter="20" wrap>
        <Col l="17">
          <EventCalendar />
        </Col>
        <Col l="7">
          <NewEvent />
          <EventList />
        </Col>
      </Row>
    );
  }
}
