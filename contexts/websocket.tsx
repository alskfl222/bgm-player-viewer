import { useState, useEffect, useRef, useCallback, createContext } from 'react';
import { Item, WebsocketContextType } from '@/types';
import { getSendData } from '@/utils';

export const WebsocketContext = createContext<WebsocketContextType>({
  queue: [],
  send: (eventName: string, data: any) => {},
});

export function WebsocketProvider({ children }: any) {
  const [queue, setQueue] = useState<Item[]>([
    { id: 'b12-WUgXAzg', from: 'streamer' },
  ]);
  const ws = useRef<WebSocket | null>(null);

  const send = (eventName: string, data: Item) => {
    ws.current?.send(getSendData(eventName, data));
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
    async function initController() {
      const { data } = await fetch('http://localhost:4004/list').then((res) =>
        res.json()
      );
      setQueue((q) => data.queue);
    }
    initController();

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
