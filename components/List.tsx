import { Item } from '@/types';
import ListItem from './ListItem';

export default function List({ queue }: { queue: Item[] }) {
  return (
    <div>
      {queue.slice(1).map((item, idx) => {
        return <ListItem item={item} idx={idx} key={item.id + idx} />;
      })}
    </div>
  );
}
