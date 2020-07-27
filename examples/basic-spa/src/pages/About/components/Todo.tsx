/* eslint @typescript-eslint/explicit-member-accessibility:0 */
import React, { PureComponent } from 'react';

class Todo extends PureComponent {
  componentDidMount() {
    throw new Error('test error boundary');
  }

  render() {
    return (
      <div>
        TODO Component
      </div>
    );
  }
}

export default Todo;
