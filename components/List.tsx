import { useContext } from 'react';
import { WebsocketContext } from '@/contexts/websocket';
import ListItem from './ListItem';

export default function List() {
  const { queue } = useContext(WebsocketContext);
  return (
    <div className='flex flex-col gap-2'>
      {queue.slice(1).map((item, idx) => {
        return <ListItem item={item} idx={idx + 1} key={item.id + idx} />;
      })}
    </div>
  );
}
