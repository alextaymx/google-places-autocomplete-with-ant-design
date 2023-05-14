import styles from '../styles/index.module.css';

import AppBody from '@/components/body/AppBody';
import AppHeader from '@/components/header/AppHeader';

export default function Home() {
  return (
    <div className={styles.content}>
      <AppHeader />
      <AppBody />
    </div>
  );
}
