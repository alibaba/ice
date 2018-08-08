import React from 'react';
import PropTypes from 'prop-types';

class CardAuthor extends React.Component {
  render() {
    return (
      <div className="author">
        <a href={this.props.link ? this.props.link : '#'}>
          <img
            className="avatar border-gray"
            src={this.props.avatar}
            alt={this.props.avatarAlt}
          />
          <h5 className="title">{this.props.title}</h5>
        </a>
        <p className="description">{this.props.description}</p>
      </div>
    );
  }
}

CardAuthor.propTypes = {
  link: PropTypes.string,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default CardAuthor;
