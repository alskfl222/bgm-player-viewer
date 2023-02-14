import Head from 'next/head';
import Image from 'next/image';
import List from '@/components/List';
import RequestSong from '@/components/RequestSong';
import { YoutubePlayer } from '@/components/YoutubePlayer';
import ItemNow from '@/components/ItemNow';

export default function Home() {
  return (
    <>
      <Head>
        <title>BGM-PLAYER</title>
        <meta
          name='description'
          content='BGM player main for alskfl222 stream'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='px-4 flex justify-center'>
        <div className='w-full max-w-[480px] p-2 flex flex-col items-center gap-4'>
          <YoutubePlayer />
          <RequestSong />
          <ItemNow />
          <List />
        </div>
      </div>
    </>
  );
}
