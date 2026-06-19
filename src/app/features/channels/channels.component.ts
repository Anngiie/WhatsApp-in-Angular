import { Component, EventEmitter, Output } from '@angular/core';
import { Channel } from '../../core/models/channel.model';

const MOCK_CHANNELS: Channel[] = [
  {
    name: 'Italian Food Recipes',
    followers: '12.3k',
    description: 'Authentic Italian recipes',
    followed: false,
    posts: [
      { id: 1, body: 'Today we are making fresh pasta from scratch! 🍝 Here is the step-by-step guide.', time: '10:30 AM' },
      { id: 2, body: 'Check out this amazing carbonara we made yesterday!', time: 'Yesterday', image: '' },
      { id: 3, body: 'New recipe alert: Classic Margherita pizza with San Marzano tomatoes.', time: '2 days ago' },
    ],
  },
  {
    name: 'Arsenal FC',
    followers: '45.8k',
    description: 'Official Arsenal fan channel',
    followed: false,
    posts: [
      { id: 1, body: 'FULL TIME: Arsenal 3 - 1 Chelsea! What a performance! 🔴⚪', time: '2:45 PM' },
      { id: 2, body: 'Match day! Big game today at the Emirates. COYG! 🔴', time: '9:00 AM' },
      { id: 3, body: 'Saka wins Player of the Month! Deserved!', time: '3 days ago' },
    ],
  },
  {
    name: 'BBC News',
    followers: '89.2k',
    description: 'Trusted news from around the world',
    followed: false,
    posts: [
      { id: 1, body: 'Breaking: Global climate summit reaches historic agreement', time: '11:20 AM' },
      { id: 2, body: 'Tech roundup: AI advancements reshape industry landscape', time: 'Yesterday' },
    ],
  },
  {
    name: 'Space Exploration',
    followers: '23.1k',
    description: 'Everything about space and astronomy',
    followed: false,
    posts: [
      { id: 1, body: 'NASA reveals new images from James Webb telescope - absolutely breathtaking! 🔭', time: '8:15 AM' },
      { id: 2, body: 'SpaceX successfully lands Starship on Mars surface in historic first', time: '2 days ago' },
    ],
  },
  {
    name: 'Mindfulness & Meditation',
    followers: '6.7k',
    description: 'Daily mindfulness tips',
    followed: false,
    posts: [
      { id: 1, body: '5-minute breathing exercise to start your day with clarity and peace.', time: '7:00 AM' },
      { id: 2, body: 'Remember: You cannot control everything that happens, but you can control how you respond.', time: 'Yesterday' },
    ],
  },
];

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  standalone: false,
})
export class ChannelsComponent {
  @Output() channelSelected = new EventEmitter<Channel>();

  channels: Channel[] = [...MOCK_CHANNELS];

  selectChannel(channel: Channel): void {
    this.channelSelected.emit(channel);
  }

  toggleFollow(channel: Channel, event: Event): void {
    event.stopPropagation();
    channel.followed = !channel.followed;
  }
}
