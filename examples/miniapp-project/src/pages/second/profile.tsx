import styles from './profile.module.css';

export default function Profile() {
  return (
    <>
      <view className={styles.profile}>second profile</view>
    </>
  );
}

export function pageConfig() {
  return {
    title: 'Second profile',
  };
}
