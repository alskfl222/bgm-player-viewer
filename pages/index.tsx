import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { throttle } from 'lodash';
import YouTube from 'react-youtube';

export default function Home() {
  const [width, setWidth] = useState(280);
  const [opts, setOpts] = useState({
    width: '240',
    height: '135',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', throttle(handleResize, 500));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (width < 280) {
      setOpts({ ...opts, width: '240', height: '135' });
    } else if (width < 1024) {
      setOpts({
        ...opts,
        width: `${width - 40}`,
        height: `${((width - 40) / 16) * 9}`,
      });
    } else {
      setOpts({ ...opts, width: '984', height: '554' });
    }
    // eslint-disable-next-line
  }, [width]);

  const onStateChange = (e: { target: any; data: number }) => {
    const type = e.data;
    console.log(type);
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
        videoId='2g811Eo7K8U'
        opts={opts}
        onStateChange={onStateChange}
      />
    </>
  );
}
