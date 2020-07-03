import * as React from 'react';

const About = (props) => {
  const { history } = props;
  return (
    <div>
      <h2>About Page</h2>
      <p onClick={() => history.push('/home')}>go home</p>
    </div>
  );
};

export default About;
