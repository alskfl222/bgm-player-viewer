import { ChangeEvent, useState, useContext } from 'react';
import { WebsocketContext } from '@/contexts/websocket';

export default function RequestSong() {
  const { send } = useContext(WebsocketContext);
  const [query, setQuery] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const onClick = () => {
    send('append', { query, from: 'streamer' });
  };
  return (
    <div>
      <input type='text' onChange={onChange} />
      <div>
        <span>{query}</span>
      </div>
      <button onClick={onClick}>추가</button>
    </div>
  );
}
