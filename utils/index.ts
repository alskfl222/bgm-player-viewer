import { Item } from '@/types';

export const getChannelUrl = (channelId: Item['channel_id']) => {
  if (channelId[0] === '@') {
    return `https://www.youtube.com/${channelId}`;
  } else {
    return `https://www.youtube.com/channel/${channelId}`;
  }
};
