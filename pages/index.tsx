import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import YouTube, { YouTubeProps } from 'react-youtube';

type Item = {
  id: string;
  from: string;
};

export default function Home() {
  const [queue, setQueue] = useState<Item[]>([
    { id: 'HoSQqadfiag', from: 'streamer' },
    { id: 'oKCQJ8w5e3E', from: 'streamer' },
    { id: 'pnxYMsBdyxo', from: 'streamer' },
    { id: 'b12-WUgXAzg', from: 'streamer' },
  ]);

  const [prev, setPrev] = useState<Item[]>([]);

  const [list, setList] = useState<Item[]>([...prev, ...queue]);

  const opts: YouTubeProps['opts'] = {
    width: '480',
    height: '270',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps['onReady'] = (e) => {
    console.log('onReady');
    e.target.mute();
  };

  const onStateChange: YouTubeProps['onStateChange'] = (e) => {
    console.log('onStateChange', e.data);
    const type = e.data;
    if (type === 0) setQueue((queue) => queue.slice(1));
    if (type === 1) {
      if (e.target.isMuted()) {
        console.log('음소거');
        e.target.unMute();
      } else console.log('음소거 아님');
    }
  };

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

      <div>
        <p>개발시작</p>
      </div>

      <YouTube
        id='player'
        videoId={queue[0].id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <div>
        {list.map((item, idx) => {
          return (
            <div key={item.id + idx}>
              <span>
                {item.id === queue[0].id ? <strong>{item.id}</strong> : item.id}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
