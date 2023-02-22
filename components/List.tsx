import ListItem from './ListItem';
import { WebsocketType } from '@/types';

export default function List({ queue }: Pick<WebsocketType, 'queue'>) {
  return (
    <div className='w-full flex flex-col gap-2'>
      {queue.slice(1).map((item, idx) => {
        return <ListItem item={item} idx={idx + 1} key={item.id + idx} />;
      })}
    </div>
  );
}
