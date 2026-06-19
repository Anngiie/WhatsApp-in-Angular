export interface ChannelPost {
  id: number;
  body: string;
  time: string;
  image?: string;
}

export interface Channel {
  name: string;
  followers: string;
  description: string;
  followed: boolean;
  posts: ChannelPost[];
}
