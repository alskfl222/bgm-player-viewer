import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import YouTube, { YouTubeProps } from 'react-youtube';
import RequestSong from '@/components/RequestSong';
import { WebsocketContext } from '@/contexts/websocket';
import ListItem from '@/components/ListItem';

export default function Home() {
  const { queue, send } = useContext(WebsocketContext);

  const opts: YouTubeProps['opts'] = {
    width: '480',
    height: '270',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps['onReady'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log('onReady');
    // e.target.mute();
  };

  const onStateChange: YouTubeProps['onStateChange'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log('onStateChange', e.data);
    if (e.data === -1) {
      console.log('시작되지 않음');
    }
    if (e.data === 0) {
      e.target.loadVideoById(queue[1].id);
      e.target.playVideo();
      send('stop');
    }
    if (e.data === 1) {
      // if (e.target.isMuted()) {
      //   console.log('음소거');
      //   e.target.unMute();
      // } else console.log('음소거 아님');
      send('play');
    }
    if (e.data === 2) {
      send('pause');
    }
  };

  const onError: YouTubeProps['onError'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log(e)
    if (e.data === 101 || e.data === 150) {
      send('inactive')
      send('stop');
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
        onError={onError}
      />

      <div>
        {queue.map((item, idx) => {
          return <ListItem item={item} idx={idx} key={item.id + idx} />;
        })}
      </div>

      <RequestSong />
    </>
  );
}
