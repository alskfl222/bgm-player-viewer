import { useContext } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { WebsocketContext } from '@/contexts/websocket';

export function YoutubePlayer() {
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
    console.log('getCurrentTime', e.target.getCurrentTime());
    const currentTime = e.target.getCurrentTime().toFixed(2);
    const data = { ...queue[0], current: currentTime };
    if (e.data === -1) {
      console.log('시작되지 않음');
    }
    if (e.data === 0) {
      e.target.loadVideoById(queue[1].id);
      e.target.playVideo();
      send('stop', data);
    }
    if (e.data === 1) {
      // if (e.target.isMuted()) {
      //   console.log('음소거');
      //   e.target.unMute();
      // } else console.log('음소거 아님');
      send('play', data);
    }
    if (e.data === 2) {
      send('pause', data);
    }
  };

  const onError: YouTubeProps['onError'] = (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Events
    console.log(e);
    if (e.data === 101 || e.data === 150) {
      e.target.loadVideoById(queue[1].id);
      e.target.playVideo();
      send('inactive');
      send('stop');
    }
  };
  return (
    <YouTube
      id='player'
      videoId={queue[0].id}
      opts={opts}
      onReady={onReady}
      onStateChange={onStateChange}
      onError={onError}
    />
  );
}
