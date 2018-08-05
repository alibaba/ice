import React from 'react';
// used for making the prop types of this component
import PropTypes from 'prop-types';

class Stats extends React.Component {
  render() {
    const stats = [];
    for (let i = 0; i < this.props.children.length; i++) {
      stats.push(<i className={this.props.children[i].i} key={i} />);
      stats.push(' ' + this.props.children[i].t);
      if (i !== this.props.children.length - 1) {
        stats.push(<br />);
      }
    }
    return <div className="stats">{stats}</div>;
  }
}

Stats.propTypes = {
  children: PropTypes.array,
};

export default Stats;
