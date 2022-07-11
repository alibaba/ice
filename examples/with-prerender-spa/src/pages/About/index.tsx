import React from 'react';
import { useParams } from 'ice';

function About(props) {
  const { name } = props;
  const { id } = useParams();

  return (
    <h2>About {name} {id}</h2>
  );
}

About.getStaticPaths = async () => {
  return await Promise.resolve(['/about/a', '/about/b', '/about/c']);
};

About.getInitialProps = async () => {
  return {
    name: 'Jack',
  };
};

export default About;
