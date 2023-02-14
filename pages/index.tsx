import { useState, useEffect, useRef, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { WebsocketContext } from '@/contexts/websocket';
import List from '@/components/List';
import RequestSong from '@/components/RequestSong';
import { YoutubePlayer } from '@/components/YoutubePlayer';

export default function Home() {
  const { queue, send } = useContext(WebsocketContext);
  const [show, setShow] = useState(false);
  const now = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) setShow(true);
        else setShow(false);
      },
      { threshold: 0.8 }
    );
    if (now.current) {
      io.observe(now.current);
    }
    return () => io && io.disconnect();
    // eslint-disable-next-line
  }, [now.current]);

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

      <div className='p-4 flex justify-center'>
        <div className='w-full max-w-[480px] flex flex-col items-center gap-4'>
          <YoutubePlayer />

          <RequestSong />

          {show && <div className='fixed w-full h-10 bg-neutral-300'>show</div>}
          <div ref={now}>{queue[0].title}</div>

          <List queue={queue} />
        </div>
      </div>
    </>
  );
}
