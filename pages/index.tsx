import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import YouTube, { YouTubeProps } from 'react-youtube';
import RequestSong from '@/components/RequestSong';
import useWebSocket from '@/hooks/useWebSocket';
import { Item } from '@/types';
import { getSendData } from '@/utils';


export default function Home() {
  const ws = useWebSocket('ws://localhost:4004/ws');

  const [queue, setQueue] = useState<Item[]>([
    { id: 'b12-WUgXAzg', from: 'streamer' },
  ]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    async function initController() {
      const { queue } = await fetch('http://localhost:4004/list').then((res) =>
        res.json()
      );
      setQueue((q) => queue);
    }
    initController();
    // eslint-disable-next-line
  }, []);

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
    if (e.data === 0) {
      setIndex((idx) => {
        let nextIdx = 0;
        if (idx < queue.length - 1) {
          nextIdx = idx + 1;
        }
        e.target.loadVideoById(queue[nextIdx].id);
        e.target.playVideo();
        return nextIdx;
      });
    }
    if (e.data === 1) {
      if (e.target.isMuted()) {
        console.log('음소거');
        e.target.unMute();
        ws?.send(getSendData('play', queue[index]));
      } else console.log('음소거 아님');
    }
    if (e.data === 2) {
      ws?.send(getSendData('pause', queue[index]));
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
        videoId={queue[index].id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      <div>
        {queue.map((item, idx) => {
          return (
            <div key={item.id + idx}>
              <span>
                {item.id === queue[index].id ? (
                  <strong style={{ fontStyle: 'italic' }}>{item.id}</strong>
                ) : (
                  item.id
                )}
              </span>
            </div>
          );
        })}
      </div>

      <RequestSong ws={ws} />
    </>
  );
}
