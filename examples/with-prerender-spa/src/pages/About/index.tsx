import React from 'react';
import { useParams } from 'ice';

function About() {
  const { id } = useParams();

  return (
    <h2>About {id}</h2>
  );
}

About.getStaticPaths = async () => {
  return await Promise.resolve(['/about/a', '/about/b', '/about/c']);
};

export default About;
