import React from 'react';
import { getLink } from '../../../utils';

const EcoItem = (props) => {
  const { eco } = props;
  return (
    <div className="eco-item">
      <h4>{eco.title}</h4>
      <p>{eco.content}</p>
      <div className="tags">
      {
        eco.tags.map((tag, i) => (
          <a
            key={i}
            href={getLink(tag.link)}
            target={tag.target || '_self'}
            style={{ background: tag.bgColor }}
          >
          {
            tag.text
          }
          </a>
        ))
      }
      </div>
    </div>
  );
};

export default EcoItem;
