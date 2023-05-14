import dynamic from 'next/dynamic';

import styles from '../styles/index.module.css';

import AppHeader from '@/components/header/AppHeader';

const DynamicAppBody = dynamic(() => import('@/components/body/AppBody'), {
  ssr: false,
});
export default function Home() {
  return (
    <div className={styles.content}>
      <AppHeader />
      <DynamicAppBody />
    </div>
  );
}
