import React, { Component } from 'react';
import TaskTable from './components/TaskTable';

export default class Task extends Component {
  static displayName = 'Task';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TaskTable />
      </div>
    );
  }
}
