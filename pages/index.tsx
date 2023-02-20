import Head from 'next/head';
import Image from 'next/image';
import List from '@/components/List';
import { YoutubePlayer } from '@/components/YoutubePlayer';
import RequestSong from '@/components/RequestSong';
import Now from '@/components/Now';
import { useWebsocket } from '@/hooks/useWebsocket';

export default function Home() {
  const { queue, send } = useWebsocket('controller');
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
          <YoutubePlayer queue={queue} send={send} />
          <RequestSong send={send} />
          <Now queue={queue} />
          <List queue={queue} />
        </div>
      </div>
    </>
  );
}
