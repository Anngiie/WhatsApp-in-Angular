import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ChatService } from '../../core/services/chat.service';

export type NavSection = 'chats' | 'calls' | 'status' | 'channels' | 'communities' | 'settings' | 'profile';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
  standalone: false,
})
export class NavSidebarComponent implements OnInit {
  @Output() sectionChanged = new EventEmitter<NavSection>();

  activeSection: NavSection = 'chats';
  username = '';

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.username = user?.username || '';
    });
  }

  get unreadCount(): number {
    return this.chatService.getUnreadCount();
  }

  selectSection(section: NavSection): void {
    this.activeSection = section;
    this.sectionChanged.emit(section);
  }
}
