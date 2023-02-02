import { Item } from "@/types";

export const getSendData = (event: string, item: Item) => {
  return JSON.stringify({ event, ...item });
};