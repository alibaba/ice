import React from 'react';
import { getLink } from '../../../utils';

class EventCard extends React.Component {
  render() {
    const { event } = this.props;
    return (
      <div className="event-card">
        <a href={getLink(event.link)} target={event.target || '_self'}>
          <img src={getLink(event.img)} />
        </a>
        <div className="event-introduction">
          <h4>{event.title}</h4>
          <p>{event.content}</p>
          <a href={getLink(event.link)} target={event.target || '_self'}>
            {event.dateStr}
            <img className="arrow" src={getLink('/img/system/arrow_right.png')} />
          </a>
        </div>
      </div>
    );
  }
}

export default EventCard;
