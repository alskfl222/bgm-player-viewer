export type Item = {
  title: string;
  id: string;
  from: string;
  active: boolean;
  channel: string;
  channel_id: string;
};

export type WebsocketType = {
  queue: Item[];
  state: "start" | "stop";
  currentTime: number;
  send: (eventName: string, data?: any) => void;
};