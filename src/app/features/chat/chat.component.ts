import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Conversation } from '../../core/models/conversation.model';
import { ChatService } from '../../core/services/chat.service';
import { Message } from '../../core/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false,
})
export class ChatComponent {
  @Input() conversation: Conversation | null = null;
  @ViewChild('emojiPicker') emojiPickerEl!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  emojiPickerVisible = false;
  message = '';

  constructor(private chatService: ChatService) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.emojiPickerVisible && this.emojiPickerEl && !this.emojiPickerEl.nativeElement.contains(target)) {
      this.emojiPickerVisible = false;
    }
  }

  toggleEmojiPicker(event: MouseEvent): void {
    event.stopPropagation();
    this.emojiPickerVisible = !this.emojiPickerVisible;
  }

  triggerAttachment(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      const isImage = file.type.startsWith('image/');
      reader.onload = () => {
        if (isImage) {
          this.sendImageMessage(reader.result as string, file.name);
        } else {
          this.sendFileMessage(reader.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
      input.value = '';
    }
  }

  submitMessage(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value.trim();
    this.message = '';
    if (!value) return;
    this.chatService.sendMessage(value);
  }

  emojiClicked(event: { emoji: { native: string } }): void {
    this.message += event.emoji.native;
  }

  openAttachment(message: Message): void {
    if (message.attachment) {
      const link = document.createElement('a');
      link.href = message.attachment;
      link.download = message.attachmentName || 'file';
      link.click();
    }
  }

  private sendFileMessage(dataUrl: string, fileName: string): void {
    if (!this.conversation) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const msg: Message = { id: Date.now(), body: fileName, time, me: true, read: false, attachment: dataUrl, attachmentName: fileName };
    this.conversation.messages.unshift(msg);
    this.conversation.latestMessage = `📎 ${fileName}`;
    this.conversation.time = time;
    this.conversation.lastActivity = new Date();
    this.chatService.sortByActivity();
  }

  private sendImageMessage(dataUrl: string, fileName: string): void {
    if (!this.conversation) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const msg: Message = { id: Date.now(), body: '', time, me: true, read: false, image: dataUrl };
    this.conversation.messages.unshift(msg);
    this.conversation.latestMessage = '\u{1F4F7} Photo';
    this.conversation.time = time;
    this.conversation.lastActivity = new Date();
    this.chatService.sortByActivity();
  }
}
