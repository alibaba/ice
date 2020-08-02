import React, { useEffect } from 'react';
import request from 'universal-request';

function getRepo(){
  request({
    url: 'https://ice.alicdn.com/assets/materials/react-materials.json',

  }).then(res => {
    console.log('request res:', res);
  }).catch(err => {
    console.log(err);
  });
}

const About = (props) => {

  useEffect(() => {
    getRepo();
  });

  const { history } = props;
  return (
    <div>
      <h2>About Page</h2>
      <p onClick={() => history.push('/home')}>go home</p>
    </div>
  );
};

export default About;
