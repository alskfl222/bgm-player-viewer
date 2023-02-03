import { Item } from '@/types';

export const getSendData = (eventName: string, data: Item) => {
  return JSON.stringify({
    event: { type: 'bgm', name: eventName },
    data,
  });
};
