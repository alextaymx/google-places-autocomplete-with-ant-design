import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import 'antd/dist/reset.css';
import '../styles/vars.css';
import '../styles/global.css';

import store from '@/lib/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
