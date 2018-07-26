import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const style = {
  border: '1px dashed #ddd',
  backgroundColor: '#fff',
  padding: '0.5rem 1rem',
  marginRight: '1rem',
  marginBottom: '1rem',
  cursor: 'move',
  width: '100%',
};

const boxSource = {
  beginDrag() {
    return {};
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) {
      if (props.dropBack) {
        component.setState({
          show: false,
        });
        props.dropBack(props.index);
      }
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class SourceBox extends Component {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    showCopyIcon: PropTypes.bool,
  };

  static defaultProps = {
    showCopyIcon: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      showCopyIcon,
      children,
    } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const dropEffect = showCopyIcon ? 'copy' : 'move';
    const { show } = this.state;
    return show
      ? connectDragSource &&
          connectDragSource(
            <div style={{ ...style, opacity }}>{children}</div>,
            { dropEffect }
          )
      : '';
  }
}

export default DragSource('box', boxSource, collect)(SourceBox);
