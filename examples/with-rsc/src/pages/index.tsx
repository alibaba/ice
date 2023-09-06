import { useState } from 'react';
import styles from './index.module.css';
import ServerComp from '@/components/Server';
// import Comments from '@/components/Comments';
// import Footer from '@/components/Footer';

export default function Home() {
  console.log('Render: Index');

  return (
    <div>
      <h2>Home Page</h2>
      <ServerComp />
    </div>
  );
}
