import React from 'react';
import { autobind } from 'core-decorators';
import { getLink } from '../../../utils';

@autobind
class ContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: props.contact.img,
    };
  }

  onMouseOver() {
    this.setState({
      img: this.props.contact.imgHover,
    });
  }

  onMouseOut() {
    this.setState({
      img: this.props.contact.img,
    });
  }

  render() {
    const { contact } = this.props;
    const { img } = this.state;
    return (
      <a
        className="contact-item"
        href={getLink(contact.link)}
        target={contact.target || '_self'}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <img src={getLink(img)} />
        <div>{contact.title}</div>
      </a>
    );
  }
}

export default ContactItem;
