import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'avatarUrl', standalone: false })
export class AvatarUrlPipe implements PipeTransform {
  transform(name: string | undefined | null): string {
    const seed = name?.trim() || 'default';
    return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
  }
}
