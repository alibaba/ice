import React, { useEffect, useState } from 'react';
import { getRepo } from '../../apis/lambda';

export default function Dashboard() {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    getRepo().then(repoData => {
      setDataSource(repoData.dataSource)
    })
  }, [])
  return (
    <div>
      <h2>Dashboard page</h2>
      {
        dataSource.map(item => {
          return (
            <div key={item.id} style={{marginBottom: 10}}>
              <div>name: {item.name}</div>
              <div>description: {item.description}</div>
            </div>
          )
        })
      }
    </div>
  );
}
