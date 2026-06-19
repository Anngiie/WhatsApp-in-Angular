import { Component, Input } from '@angular/core';

const PALETTE = [
  '#25D366', '#0E8172', '#00A884', '#008069',
  '#6B4CE6', '#5F5CD9', '#3B82F6', '#2563EB',
  '#E91E63', '#C2185B', '#F44336', '#D32F2F',
  '#FF9800', '#F57C00', '#FFC107', '#FFA000',
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  return trimmed[0].toUpperCase();
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: false,
})
export class AvatarComponent {
  @Input() name = '';

  get initials(): string {
    return getInitials(this.name);
  }

  get backgroundColor(): string {
    return PALETTE[hashCode(this.name) % PALETTE.length];
  }
}
