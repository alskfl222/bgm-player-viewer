import { useState, useEffect, useRef, useCallback, createContext } from 'react';
import { Item, WebsocketContextType } from '@/types';
import { getSendData } from '@/utils';

const WS_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_CLOUD!
    : process.env.NEXT_PUBLIC_LOCAL!;

export const WebsocketContext = createContext<WebsocketContextType>({
  queue: [],
  send: () => {},
});

export function WebsocketProvider({ children }: any) {
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
  const ws = useRef<WebSocket | null>(null);

  const send = (eventName: string, data?: any) => {
    ws.current?.send(getSendData(eventName, data ? data : queue[0]));
  };

  const onOpen = useCallback((ev: Event) => {
    console.log('ws connected');
    console.log(ev);
  }, []);

  const onClose = useCallback(() => {
    console.log('ws closed');
  }, []);

  const onMessage = useCallback((ev: MessageEvent<any>) => {
    console.log('get message');
    const wsData = JSON.parse(ev.data);
    const { event, data } = wsData;
    if (event.type === 'bgm') {
      if (event.name === 'queue') {
        setQueue(data.queue);
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

  return (
    <WebsocketContext.Provider value={{ queue, send }}>
      {children}
    </WebsocketContext.Provider>
  );
}
