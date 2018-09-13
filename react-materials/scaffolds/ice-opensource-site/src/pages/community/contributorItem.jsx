import React from 'react';
import { getLink } from '../../../utils';

const ContributorItem = (props) => {
  const { contributor } = props;
  const { img, title, content } = contributor;
  return (
    <div className="contributor-item">
      <img src={getLink(img)} />
      <div>{title}</div>
      <p>{content}</p>
    </div>
  );
};

export default ContributorItem;
