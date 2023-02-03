import { useEffect, useRef, useCallback } from 'react';
import { Item } from '@/types';
import { getSendData } from '@/utils';

export default function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);

  const onOpen = useCallback((ev: Event) => {
    console.log('ws connected');
    console.log(ev);
  }, []);

  const onClose = useCallback(() => {
    console.log('ws closed');
  }, []);

  const onMessage = useCallback((ev: MessageEvent<any>) => {
    console.log(ev);
  }, []);

  const onError = useCallback((ev: Event) => {
    console.log(ev);
  }, []);

  const sendData = (eventName: string, data: Item) => {
    if (ws.current) ws.current?.send(getSendData(eventName, data));
  };

  useEffect(() => {
    if (!ws.current) {
      const websocket = new WebSocket('ws://localhost:4004/ws');
      websocket.addEventListener('open', onOpen);
      websocket.addEventListener('close', onClose);
      websocket.addEventListener('message', onMessage);
      websocket.addEventListener('error', onError);
      ws.current = websocket;
    }

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current.removeEventListener('open', onOpen);
        ws.current.removeEventListener('close', onClose);
        ws.current.removeEventListener('message', onMessage);
        ws.current.removeEventListener('error', onError);
      }
    };

    // eslint-disable-next-line
  }, []);

  return { sendData };
}
