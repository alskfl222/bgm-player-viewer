import { ChangeEvent, useState, useContext } from 'react';
import { WebsocketContext } from '@/contexts/websocket';

export default function RequestSong() {
  const { send } = useContext(WebsocketContext);
  const [id, setId] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onClick = () => {
    send('append', { id, from: 'streamer' });
  };
  return (
    <div>
      <input type='text' onChange={onChange} />
      <span>{id}</span>
      <button onClick={onClick}>추가</button>
    </div>
  );
}
