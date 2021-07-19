import React, { useEffect } from 'react';
import { Link } from 'ice';
import appStore from '@/store';
import pageStore from './store';

const About = (props) => {
  console.log(props);
  const [userState, userActions] = appStore.useModel('user');
  const [pageState, pageActions] = pageStore.useModel('about');
  const actionsState = appStore.useModelEffectsState('user');

  useEffect(() => {
    const fetchData = async () => {
      await pageActions.getPageTitle();
      await userActions.getUserInfo();
    };

    fetchData();
  }, [pageActions, userActions]);

  return (
    <>
      <h2>{pageState.title}</h2>

      {
        actionsState.getUserInfo.isLoading
          ? <div>loading...</div>
          : <div>
            <div><strong>Name：</strong>{userState.name}</div>
            <div><strong>id：</strong>{userState.id}</div>
          </div>
      }

      <Link to="/home/a">home</Link>
    </>
  );
};

export default About;
