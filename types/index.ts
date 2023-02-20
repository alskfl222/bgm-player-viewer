export type Item = {
  title: string;
  id: string;
  from: string;
  active: boolean;
  channel: string;
  channel_id: string;
};

export type WebsocketContextType = {
  queue: Item[];
  send: (sessionType: string, eventName: string, data?: any) => void;
};
