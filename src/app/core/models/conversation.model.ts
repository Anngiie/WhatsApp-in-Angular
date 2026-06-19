import { Message } from './message.model';

export interface Conversation {
  name: string;
  time: string;
  latestMessage: string;
  latestMessageRead: boolean;
  unreadCount: number;
  messages: Message[];
  isGroup?: boolean;
  lastActivity?: Date;
}
