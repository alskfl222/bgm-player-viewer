import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nanum_Pen_Script } from '@next/font/google';

const nanum = Nanum_Pen_Script({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={nanum.className}>
      <Component {...pageProps} />
    </main>
  );
}
