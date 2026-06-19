import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ChatService } from '../../core/services/chat.service';
import { Conversation } from '../../core/models/conversation.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false,
})
export class SidebarComponent implements OnInit {
  @Input() filterMode: 'all' | 'groups' = 'all';
  @Output() conversationClicked: EventEmitter<Conversation> = new EventEmitter();

  searchText = '';
  activeFilter: 'all' | 'unread' | 'groups' = 'all';
  selectedConversation: Conversation | null = null;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  get conversations(): Conversation[] {
    return this.chatService.getConversations();
  }

  ngOnInit(): void {
    if (this.filterMode === 'groups') {
      this.activeFilter = 'groups';
    }
  }

  get filteredConversations(): Conversation[] {
    let result = this.conversations;

    if (this.activeFilter === 'groups') {
      result = result.filter((c) => c.isGroup);
    } else if (this.activeFilter === 'unread') {
      result = result.filter((c) => c.unreadCount > 0);
    }

    if (this.searchText) {
      return this.chatService.searchConversations(this.searchText).filter((c) => {
        if (this.activeFilter === 'groups') return c.isGroup;
        if (this.activeFilter === 'unread') return c.unreadCount > 0;
        return true;
      });
    }

    return result;
  }

  setFilter(filter: 'all' | 'unread' | 'groups'): void {
    this.activeFilter = filter;
  }

  onConversationClick(conversation: Conversation): void {
    this.selectedConversation = conversation;
    this.conversationClicked.emit(conversation);
  }

  logout(): void {
    this.authService.logout();
  }
}
