import { useState, useEffect, useRef, useCallback, createContext } from 'react';
import { Item } from '@/types';
import { getSendData } from '@/utils';

type WebsocketContextType = {
  msg: string,
  send: (eventName: string, data: any) => void;
};

export const WebsocketContext = createContext<WebsocketContextType>({
  msg: '',
  send: (eventName: string, data: any) => {},
});

export function WebsocketProvider({ children }: any) {
  const [msg, setMsg] = useState<string>('')
  const ws = useRef<WebSocket | null>(null);

  const onOpen = useCallback((ev: Event) => {
    console.log('ws connected');
    console.log(ev);
  }, []);

  const onClose = useCallback(() => {
    console.log('ws closed');
  }, []);

  const onMessage = useCallback((ev: MessageEvent<any>) => {
    console.log('get message')
    console.log(ev);
  }, []);

  const onError = useCallback((ev: Event) => {
    console.log(ev);
  }, []);

  const send = (eventName: string, data: Item) => {
    ws.current?.send(getSendData(eventName, data));
  };

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
    <WebsocketContext.Provider value={{ msg, send }}>
      {children}
    </WebsocketContext.Provider>
  );
}
