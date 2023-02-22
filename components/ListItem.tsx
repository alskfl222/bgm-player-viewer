import { Item } from '@/types';
import { getChannelUrl } from '@/utils';

type ListItemProps = { item: Item; idx: number };

export default function ListItem({ item, idx }: ListItemProps) {
  const title = item.title.length > 50 ? item.title.slice(0, 47) + '...' : item.title
  return (
    <div
      className={
        idx === 0
          ? 'w-full flex flex-col gap-2'
          : 'w-full p-4 flex flex-col gap-2 border-b'
      }
    >
      <div
        className={
          idx === 0
            ? 'font-bold'
            : 'font-bold whitespace-nowrap text-ellipsis overflow-hidden'
        }
      >
        <a
          href={`https://youtu.be/${item.id}`}
          target='_blank'
          rel='noreferrer'
          className={idx === 0 ? 'text-xl italic' : 'text-base'}
        >
          {idx !== 0 && <span>{idx}. </span>}
          <span>{title}</span>
        </a>
      </div>
      <div className='flex justify-between'>
        <a
          href={getChannelUrl(item.channel_id)}
          target='_blank'
          rel='noreferrer'
          className={idx === 0 ? 'text-lg' : 'text-sm'}
        >
          {item.channel}
        </a>
        <span className={idx === 0 ? 'text-lg' : 'text-sm'}>{item.from}</span>
      </div>
    </div>
  );
}
