import { ChangeEvent, useState } from 'react';
import { WebsocketType } from '@/types';

export default function RequestSong({ send }: Pick<WebsocketType, 'send'>) {
  const [query, setQuery] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };
  const onClick = (): void => {
    if (query) {
      setQuery('');
      send('append', { query, from: 'streamer' });
    }
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div className='w-full flex justify-between gap-8'>
      <input
        className='w-full h-8 px-2 border-b border-b-neutral-700'
        type='text'
        value={query}
        onChange={onChange}
        onKeyUp={(e) => onKeyUp(e)}
      />
      <div className='flex-none flex gap-4'>
        <button
          className='px-2 py-1 border rounded-xl hover:bg-neutral-300'
          onClick={onClick}
        >
          추가
        </button>
      </div>
    </div>
  );
}
