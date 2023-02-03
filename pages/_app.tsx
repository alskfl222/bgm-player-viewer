import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nanum_Gothic } from '@next/font/google';
import { WebsocketProvider } from '@/contexts/websocket';

const nanum = Nanum_Gothic({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WebsocketProvider>
      <main className={nanum.className}>
        <Component {...pageProps} />
      </main>
    </WebsocketProvider>
  );
}
