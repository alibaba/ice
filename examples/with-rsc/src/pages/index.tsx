import { useState } from 'react';
import { useAppContext } from 'ice';
import styles from './index.module.css';
// import Comments from '@/components/Comments';
// import Footer from '@/components/Footer';
import EditButton from '@/components/EditButton.client';
import Counter from '@/components/Counter.client';

export default function Home() {
  console.log('Render: Index');

  const appContext = useAppContext();

  console.log(appContext);

  return (
    <div>
      <h2>Home Page</h2>
      <Counter />
      <EditButton noteId="editButton">
        hello world
      </EditButton>
    </div>
  );
}
