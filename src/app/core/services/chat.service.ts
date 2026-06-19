import { Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

const MOCK_CONVERSATIONS: Conversation[] = [
  { name: 'Family Group', time: '9:15', latestMessage: 'See you Sunday!', latestMessageRead: false, unreadCount: 19, isGroup: true, messages: [
    { id: 1, body: 'Dinner at 7?', time: '9:10', me: false },
    { id: 2, body: 'Sure, sounds good!', time: '9:12', me: true },
    { id: 3, body: 'See you Sunday!', time: '9:15', me: false },
  ]},
  { name: 'Work Team', time: '7:45', latestMessage: 'Meeting moved to 3pm', latestMessageRead: true, unreadCount: 0, isGroup: true, messages: [
    { id: 1, body: 'Standup in 10', time: '7:30', me: false },
    { id: 2, body: 'Meeting moved to 3pm', time: '7:45', me: true },
  ]},
  { name: 'David', time: '8:21', latestMessage: 'Hi there!!', latestMessageRead: false, unreadCount: 5, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'James', time: '8:21', latestMessage: 'wow', latestMessageRead: true, unreadCount: 0, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Andrew', time: '8:21', latestMessage: 'I am fine', latestMessageRead: false, unreadCount: 2, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Richard', time: '8:21', latestMessage: 'lol', latestMessageRead: true, unreadCount: 0, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Dyno', time: '8:21', latestMessage: 'Alright', latestMessageRead: false, unreadCount: 1, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Julie', time: '8:21', latestMessage: "Let's go", latestMessageRead: false, unreadCount: 3, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Tom', time: '8:21', latestMessage: 'I see', latestMessageRead: true, unreadCount: 0, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Jerry', time: '8:21', latestMessage: 'OMG', latestMessageRead: false, unreadCount: 7, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Grey', time: '8:21', latestMessage: 'Oh No', latestMessageRead: false, unreadCount: 1, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Jill', time: '8:21', latestMessage: 'Thanks', latestMessageRead: true, unreadCount: 0, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Blue', time: '8:21', latestMessage: 'Take care', latestMessageRead: false, unreadCount: 4, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'King', time: '8:21', latestMessage: 'I am coming now', latestMessageRead: false, unreadCount: 12, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Kong', time: '8:21', latestMessage: 'Good Morning!', latestMessageRead: true, unreadCount: 0, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
  { name: 'Rock', time: '8:21', latestMessage: 'Good Morning!', latestMessageRead: true, unreadCount: 1247, messages: [
    { id: 1, body: 'Hello world', time: '8:21', me: true },
    { id: 2, body: 'How are you?', time: '8:21', me: false },
    { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
    { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
  ]},
];

@Injectable({ providedIn: 'root' })
export class ChatService {
  private conversations: Conversation[] = [...MOCK_CONVERSATIONS];
  private activeConversation: Conversation | null = null;

  getConversations(): Conversation[] {
    return this.conversations.sort((a, b) => {
      const da = a.lastActivity?.getTime() ?? 0;
      const db = b.lastActivity?.getTime() ?? 0;
      return db - da;
    });
  }

  getActiveConversation(): Conversation | null {
    return this.activeConversation;
  }

  setActiveConversation(conversation: Conversation): void {
    this.activeConversation = conversation;
  }

  sendMessage(body: string): void {
    if (!this.activeConversation || !body.trim()) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const message: Message = {
      id: Date.now(),
      body: body.trim(),
      time,
      me: true,
      read: false,
    };
    this.activeConversation.messages.unshift(message);
    this.activeConversation.latestMessage = body.trim();
    this.activeConversation.time = time;
    this.activeConversation.lastActivity = new Date();
    this.sortByActivity();
  }

  sortByActivity(): void {
    this.conversations = [...this.conversations].sort((a, b) => (b.lastActivity?.getTime() ?? 0) - (a.lastActivity?.getTime() ?? 0));
  }

  getUnreadCount(): number {
    return this.conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  }

  searchConversations(query: string): Conversation[] {
    const q = query.toLowerCase();
    return this.conversations.filter(
      (c) => c.name.toLowerCase().includes(q) || c.latestMessage.toLowerCase().includes(q)
    );
  }
}
