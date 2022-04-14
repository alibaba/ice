import React from 'react';
import { useParams, Link } from 'ice';

export default function DetailId() {
  const params = useParams();

  return (
    <div>
      <h2>Detail id: {params.id}</h2>
      <Link to="/detail">Back to Detail</Link>
    </div>
  );
}
