import React from 'react';
import { useNavigation, Outlet } from 'ice';

export default function Home() {
  const navigation = useNavigation();
  // Use navigation state to determine loading status, and show loading indicator.
  const isLoading = navigation.state === 'loading';
  return (
    <div>
      {isLoading && (<div>loading</div>)}
      <Outlet />
    </div>
  );
}
