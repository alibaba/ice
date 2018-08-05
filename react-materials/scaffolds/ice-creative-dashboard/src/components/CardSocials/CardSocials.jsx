import React from 'react';
// used for making the prop types of this component
import PropTypes from 'prop-types';

import CustomButton from '../CustomButton';

class CardSocials extends React.Component {
  render() {
    return (
      <div className="button-container">
        {this.props.socials.map((prop, key) => {
          return (
            <CustomButton
              color="neutral"
              icon
              round
              size={this.props.size}
              key={key}
              href={prop.link}
            >
              <i className={prop.icon} />
            </CustomButton>
          );
        })}
      </div>
    );
  }
}

CardSocials.propTypes = {
  // size of all social buttons
  size: PropTypes.oneOf(['sm', 'lg']),
  // example: [{icon: "name of icon", href="href of icon"},...]
  socials: PropTypes.arrayOf(PropTypes.object),
};

export default CardSocials;
