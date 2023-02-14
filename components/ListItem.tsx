import { Item } from '@/types';
import { getChannelUrl } from '@/utils';

type ListItemProps = { item: Item; idx: number };

export default function ListItem({ item, idx }: ListItemProps) {
  return (
    <div
      className={
        idx === 0
          ? 'w-[480px] px-4 py-8 flex flex-col gap-3 border-b'
          : 'w-[480px] p-4 flex flex-col gap-2 border-b'
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
          className={idx === 0 ? 'text-xl italic' : ''}
        >
          {idx !== 0 && <span>{idx}. </span>}
          <span>{item.title}</span>
        </a>
      </div>
      <div className='flex justify-between'>
        <a
          href={getChannelUrl(item.channel_id)}
          target='_blank'
          rel='noreferrer'
          className={idx === 0 ? 'text-lg' : ''}
        >
          {item.channel}
        </a>
        <span className={idx === 0 ? 'text-lg' : ''}>{item.from}</span>
      </div>
    </div>
  );
}
