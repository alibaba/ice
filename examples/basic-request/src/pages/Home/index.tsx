import React, { useEffect } from 'react'
import { useRequest } from 'ice'

const Home = () => {
  const { data, error, loading, request: fetchRepo } = useRequest({ url: '/api/repo' })

  useEffect(() => {
    fetchRepo()
  }, [])

  console.log(data)

  return (
    <div>
      <h2>data fetching with icejs</h2>

      {
        loading ?
          <div>loading...</div> :
          <>
            <div><strong>repo name：</strong>{data && data.name}</div>
            <div><strong>repo url：</strong>{data && data.url}</div>
          </>
      }
    </div>
  )
};

export default Home;
