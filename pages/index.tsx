import Head from 'next/head';
import Image from 'next/image';
import List from '@/components/List';
import RequestSong from '@/components/RequestSong';
import Now from '@/components/Now';
import { useWebsocket } from '@/hooks/useWebsocket';

export default function Home() {
  const { queue, currentTime, duration, isPlay, send } = useWebsocket('viewer');
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
          <Now
            queue={queue}
            currentTime={currentTime}
            duration={duration}
            isPlay={isPlay}
            send={send}
          />
        <RequestSong send={send} />
          <List queue={queue} />
        </div>
      </div>
    </>
  );
}
