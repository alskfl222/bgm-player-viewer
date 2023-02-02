import { ChangeEvent, useState } from 'react';
import { getSendData } from '@/utils';

export default function RequestSong({ ws }: { ws: WebSocket | null }) {
  const [id, setId] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onClick = () => {
    ws?.send(getSendData('append', { id, from: 'streamer' }));
  };
  return (
    <div>
      <input type='text' onChange={onChange} />
      <span>{id}</span>
      <button onClick={onClick}>추가</button>
    </div>
  );
}
