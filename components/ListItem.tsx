import { Item } from '@/types';

type ListItemProps = { item: Item; idx: number };

export default function ListItem({ item, idx }: ListItemProps) {
  return (
    <div className='p-4'>
      <span className='p-4'>
        {idx === 0 ? (
          <strong style={{ fontStyle: 'italic' }}>{item.title}</strong>
        ) : (
          item.title
        )}
      </span>
      <span>{item.channel}</span>
      <span>{item.from}</span>
    </div>
  );
}
