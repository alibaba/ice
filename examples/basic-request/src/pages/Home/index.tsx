import React, { useEffect } from 'react';
import { useRequest } from 'ice';
import service from './service';

const Home = () => {
  const { data, loading, request: fetchRepo } = useRequest(service.getRepo);

  useEffect(() => {
    fetchRepo();
  }, [fetchRepo]);

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
  );
};

export default Home;
