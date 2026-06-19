import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './features/main/main.component';
import { NavSidebarComponent } from './features/nav-sidebar/nav-sidebar.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { ChatComponent } from './features/chat/chat.component';
import { LoginComponent } from './features/login/login.component';
import { SettingsComponent } from './features/settings/settings.component';
import { CallsComponent } from './features/calls/calls.component';
import { StatusComponent } from './features/status/status.component';
import { ChannelsComponent } from './features/channels/channels.component';
import { CommunitiesComponent } from './features/communities/communities.component';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { AvatarUrlPipe } from './shared/avatar-url.pipe';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, MainComponent, NavSidebarComponent, SidebarComponent, ChatComponent, LoginComponent, SettingsComponent, CallsComponent, StatusComponent, ChannelsComponent, CommunitiesComponent, AvatarComponent, AvatarUrlPipe],
  imports: [BrowserModule, CommonModule, AppRoutingModule, FormsModule, PickerComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
