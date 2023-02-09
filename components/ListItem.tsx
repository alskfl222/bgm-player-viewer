import { Item } from '@/types';

type ListItemProps = { item: Item; idx: number };

export default function ListItem({ item, idx }: ListItemProps) {
  return (
    <div>
      <span>
        {idx === 0 ? (
          <strong style={{ fontStyle: 'italic' }}>{item.title}</strong>
        ) : (
          item.title
        )}
        {item.channel}
        {item.from}
      </span>
    </div>
  );
}
