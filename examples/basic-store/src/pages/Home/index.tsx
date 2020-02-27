import React, { useEffect } from 'react'
import { Link, store as appStore } from 'ice'
import { store as pageStore } from 'ice/Home'

const Home = () => {
  const [appState, appActions] = appStore.useModel('user')
  const [pageState] = pageStore.useModel('default')

  useEffect(() => {
    const fetch = async () => {
      appActions.getUserInfo()
    }
    fetch()
  }, [])

  return (
    <>
      <h2>{pageState.title}</h2>

      <div>
        <strong>userName：</strong>
        {appState.dataSource.userName}
      </div>

      <div>
        <strong>age：</strong>
        {appState.dataSource.age}
      </div>

      <Link to="/counter">counter</Link>
    </>
  )
};

export default Home;
