import { ChangeEvent, useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket';

export default function RequestSong() {
  const [id, setId] = useState<string>('');
  const { sendData } = useWebSocket();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onClick = () => {
    sendData('append', { id, from: 'streamer' });
  };
  return (
    <div>
      <input type='text' onChange={onChange} />
      <span>{id}</span>
      <button onClick={onClick}>추가</button>
    </div>
  );
}
