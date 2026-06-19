import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: false,
})
export class SettingsComponent implements OnInit {
  @Input() embedded = false;

  displayName = '';
  about = '';
  saveMessage = '';

  lastSeen = 'Everyone';
  profilePhoto = 'Everyone';
  aboutPrivacy = 'Everyone';
  statusPrivacy = 'My Contacts';
  readReceipts = true;
  groupInvite = 'Everyone';
  blockedContacts = 0;

  twoStepEnabled = false;
  privacyLockEnabled = false;

  messageNotifications = true;
  groupNotifications = true;
  callNotifications = true;
  previewMessages = true;

  theme = 'Dark';
  enterToSend = true;
  keepArchived = false;
  fontSize = 'Medium';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.displayName = user.displayName;
        this.about = user.about;
      }
    });
  }

  saveProfile(): void {
    if (!this.displayName.trim()) return;
    this.saveMessage = '';

    this.authService.updateProfile(this.displayName.trim(), this.about).subscribe({
      next: () => {
        this.saveMessage = 'Profile saved.';
      },
      error: () => {
        this.saveMessage = 'Failed to save profile.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
