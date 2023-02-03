export type Item = {
  name: string;
  id: string;
  from: string;
};

export type WebsocketContextType = {
  queue: Item[];
  send: (eventName: string, data?: any) => void;
};