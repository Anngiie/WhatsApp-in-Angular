export interface Message {
  id: number;
  body: string;
  time: string;
  me: boolean;
  read?: boolean;
  image?: string;
  attachment?: string;
  attachmentName?: string;
}
