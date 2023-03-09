import { useState, useEffect, useRef, useCallback } from 'react';
import { Item, WebsocketType } from '@/types';

// const WS_SERVER_URL = process.env.NEXT_PUBLIC_WS_LOCAL!;
const WS_SERVER_URL = process.env.NEXT_PUBLIC_WS_CLOUD!;

export function useWebsocket(sessionType: string): WebsocketType {
  const [queue, setQueue] = useState<Item[]>([
    {
      title: '몽환의 숲 (Phantasmal Woods) [메이플스토리 OST : 아케인 리버]',
      id: 'U_-yYE38F9w',
      from: 'list',
      channel: 'NECORD MUSIC',
      channel_id: 'UC7gy0ee1jeNO11HievGQJzA',
      active: true,
    },
  ]);
  const [id, setId] = useState<string>('');
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const ws = useRef<WebSocket | null>(null);

  const send = useCallback(
    (name: string, data?: any) => {
      ws.current?.send(
        JSON.stringify({
          event: { from: sessionType, name, id },
          data: data ? data : queue[0],
        })
      );
    },
    [sessionType, queue, id]
  );

  const onOpen = useCallback(() => {
    console.log(`SERVER ${WS_SERVER_URL} connected`);
    send('session', {});
    // eslint-disable-next-line
  }, []);

  const onClose = useCallback(() => {
    console.log('ws close');
  }, []);

  const onMessage = useCallback(
    (ev: MessageEvent<any>) => {
      const wsData = JSON.parse(ev.data);
      const { event, data } = wsData;
      const { to, name } = event;
      if (name === 'session') {
        setId(data.sessionId);
        return;
      }
      setQueue(data.queue);
      setIsPlay(data.bgm.active);
      if (currentTime === 0) setCurrentTime(Number(data.bgm.currentTime));
      if (duration === 0) setDuration(Number(data.bgm.duration));
    },
    [currentTime, duration]
  );

  const onError = useCallback((ev: Event) => {
    console.log(ev);
  }, []);

  useEffect(() => {
    if (!ws.current) {
      const websocket = new WebSocket(WS_SERVER_URL);
      websocket.onopen = onOpen;
      websocket.onclose = onClose;
      websocket.onmessage = onMessage;
      websocket.onerror = onError;
      ws.current = websocket;
    }

    return () => {
      ws.current?.close();
    };

    // eslint-disable-next-line
  }, []);

  return { queue, currentTime, duration, isPlay, send };
}
