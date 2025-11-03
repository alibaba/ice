import React from 'react';
import { Link } from 'ice';

export default function Home() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', padding: '20px' }}>
        Test Page
      </h2>
      <div style={{ textAlign: 'center' }}>
        <Link to="/home">Go to Home Page</Link>
      </div>
    </div>
  );
}
