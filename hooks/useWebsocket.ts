import { useState, useEffect, useRef, useCallback } from 'react';
import { Item, WebsocketType } from '@/types';

// const WS_SERVER_URL = process.env.NEXT_PUBLIC_CLOUD!
const WS_SERVER_URL = process.env.NEXT_PUBLIC_LOCAL!;

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
  const [state, setState] = useState<"start" | "stop">('stop');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const ws = useRef<WebSocket | null>(null);

  const send = useCallback(
    (eventName: string, data?: any) => {
      ws.current?.send(
        JSON.stringify({
          session: { type: sessionType, event: `bgm.${eventName}`, id },
          data: data ? data : queue[0],
        })
      );
    },
    [sessionType, queue, id]
  );

  const onOpen = useCallback((ev: Event) => {
    console.log(`SERVER ${WS_SERVER_URL} connected`);
    send('session');
    // eslint-disable-next-line
  }, []);

  const onClose = useCallback(() => {
    console.log('ws close');
  }, []);

  const onMessage = useCallback((ev: MessageEvent<any>) => {
    console.log('get message');
    const wsData = JSON.parse(ev.data);
    const { session, data } = wsData;
    const [eventType, eventName] = session.event.split('.');
    if (eventType === 'bgm') {
      if (eventName === 'queue') {
        setQueue(data.queue);
      }
      if (eventName === 'session') {
        setId(data.session_id);
      }
      if (eventName === 'current_time') {
        console.log(data)
        setState(data.state)
        setCurrentTime(Math.floor(Number(data.current_time)))
      }
    }
  }, []);

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

  return { queue, state, currentTime, send };
}
