import { Component } from '@angular/core';
import { ChatService } from '../../core/services/chat.service';
import { Conversation } from '../../core/models/conversation.model';
import { Channel } from '../../core/models/channel.model';
import { NavSection } from '../nav-sidebar/nav-sidebar.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: false,
})
export class MainComponent {
  conversation: Conversation | null = null;
  activeSection: NavSection = 'chats';
  selectedChannel: Channel | null = null;

  constructor(private chatService: ChatService) {}

  onSectionChanged(section: NavSection): void {
    this.activeSection = section;
    if (section !== 'chats') {
      this.conversation = null;
    }
    this.selectedChannel = null;
  }

  onConversationSelected(conversation: Conversation): void {
    this.chatService.setActiveConversation(conversation);
    this.conversation = conversation;
  }

  onChannelSelected(channel: Channel): void {
    this.selectedChannel = channel;
  }

  toggleChannelFollow(): void {
    if (this.selectedChannel) {
      this.selectedChannel.followed = !this.selectedChannel.followed;
    }
  }
}
