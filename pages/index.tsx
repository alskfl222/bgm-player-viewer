import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import YouTube, { YouTubeProps } from 'react-youtube';

export default function Home() {
  const opts: YouTubeProps['opts'] = {
    width: '480',
    height: '270'
  };

  const onReady: YouTubeProps['onReady'] = (e) => {
    console.log(e.target);
  };

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
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </>
  );
}
