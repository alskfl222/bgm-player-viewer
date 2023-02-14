import { ChangeEvent, useState, useContext } from 'react';
import { WebsocketContext } from '@/contexts/websocket';

export default function RequestSong() {
  const { send } = useContext(WebsocketContext);
  const [query, setQuery] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };
  const onClick = (): void => {
    send('append', { query, from: 'streamer' });
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') onClick();
  };
  return (
    <div className='w-full flex justify-between gap-4'>
      <input
        className='w-full h-12 px-4 border-b border-b-neutral-700'
        type='text'
        onChange={onChange}
        onKeyUp={(e) => onKeyUp(e)}
      />
      <button
        className='flex-none p-2 border rounded-xl hover:bg-neutral-300'
        onClick={onClick}
      >
        추가
      </button>
    </div>
  );
}
