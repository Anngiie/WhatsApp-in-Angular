import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavSidebarComponent } from './features/nav-sidebar/nav-sidebar.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { ChatComponent } from './features/chat/chat.component';
import { SettingsComponent } from './features/settings/settings.component';
import { CallsComponent } from './features/calls/calls.component';
import { StatusComponent } from './features/status/status.component';
import { ChannelsComponent } from './features/channels/channels.component';
import { CommunitiesComponent } from './features/communities/communities.component';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { AvatarUrlPipe } from './shared/avatar-url.pipe';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavSidebarComponent, SidebarComponent, ChatComponent, SettingsComponent, CallsComponent, StatusComponent, ChannelsComponent, CommunitiesComponent, AvatarComponent, AvatarUrlPipe],
      imports: [RouterTestingModule, FormsModule, PickerComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
