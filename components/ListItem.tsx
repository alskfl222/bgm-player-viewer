import { Item } from '@/types';
import { getChannelUrl } from '@/utils';

type ListItemProps = { item: Item; idx: number };

export default function ListItem({ item, idx }: ListItemProps) {
  return (
    <div className='w-[480px] p-4 flex flex-col gap-2 border rounded-xl'>
      <div className='font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
        <a
          href={`https://youtu.be/${item.id}`}
          className={idx === 0 ? 'italic' : ''}
        >
          {item.title}
        </a>
      </div>
      <div className='flex justify-between'>
        <a href={getChannelUrl(item.channel_id)}>{item.channel}</a>
        <span>{item.from}</span>
      </div>
    </div>
  );
}
