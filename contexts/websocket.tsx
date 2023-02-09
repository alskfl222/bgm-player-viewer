import { useState, useEffect, useRef, useCallback, createContext } from 'react';
import { Item, WebsocketContextType } from '@/types';
import { getSendData } from '@/utils';

export const WebsocketContext = createContext<WebsocketContextType>({
  queue: [],
  send: () => {},
});

export function WebsocketProvider({ children }: any) {
  const [queue, setQueue] = useState<Item[]>([
    {
      title: 'Fairy Tale',
      id: 'b12-WUgXAzg',
      from: 'list',
      channel: 'Author wind - Topic',
      channel_id: 'UCeieSudBwInJNTbW0ylHfGg',
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
      const websocket = new WebSocket('ws://localhost:4004/ws');
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
