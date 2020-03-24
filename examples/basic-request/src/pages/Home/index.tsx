import React, { useEffect } from 'react'
import { useRequest, request } from 'ice'

const Home = () => {
  // 1. useRequest hook
  const { data, loading, request: fetchRepo } = useRequest({ url: '/repo' })

  useEffect(() => {
    fetchRepo()
    
    request('/user').then(res => console.log('get:', res))
    // 2. requse.get alias
    request.get('/user').then(res => console.log('get:', res))

    // 3. requse.post alias
    request.post('/users/123').then(res => console.log('post:', res))

    // 4. requse.delete alias
    request.delete('/user/123').then(res => console.log('delete:', res))

    // 5. request method
    request({ url: '/user'}).then((res) => {console.log('request:', res)})
  }, [])

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
