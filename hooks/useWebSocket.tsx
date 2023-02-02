import { useEffect, useState } from 'react';

export default function useWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    setWs(new WebSocket('ws://localhost:4004/ws'));
    return () => {
      if (ws) ws.close();
    };
    // eslint-disable-next-line
  }, []);

  return ws
}
