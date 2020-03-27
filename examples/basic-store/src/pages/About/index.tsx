import React, { useEffect } from 'react';
import { Link, store as appStore  } from 'ice';
import { store as pageStore } from 'ice/About';

const About = () => {
  const [userState, userActions] = appStore.useModel('user');
  const [pageState, pageActions] = pageStore.useModel('default');
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

      <Link to="/">home</Link>
    </>
  );
};

export default About;
