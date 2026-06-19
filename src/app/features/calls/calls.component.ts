import { Component } from '@angular/core';

interface CallRecord {
  name: string;
  time: string;
  type: 'outgoing' | 'incoming' | 'missed' | 'video';
}

const MOCK_CALLS: CallRecord[] = [
  { name: 'David', time: 'Yesterday, 14:32', type: 'outgoing' },
  { name: 'Julie', time: 'Yesterday, 10:15', type: 'missed' },
  { name: 'James', time: 'Tuesday, 18:45', type: 'incoming' },
  { name: 'Andrew', time: 'Tuesday, 09:20', type: 'video' },
  { name: 'Family Group', time: 'Monday, 20:10', type: 'outgoing' },
  { name: 'Richard', time: 'Monday, 16:55', type: 'missed' },
  { name: 'Tom', time: 'Sunday, 12:30', type: 'incoming' },
  { name: 'Jerry', time: 'Sunday, 09:00', type: 'outgoing' },
  { name: 'Kong', time: 'Saturday, 21:15', type: 'missed' },
  { name: 'Blue', time: 'Saturday, 17:40', type: 'video' },
];

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
  standalone: false,
})
export class CallsComponent {
  searchText = '';
  calls: CallRecord[] = [...MOCK_CALLS];

  get filteredCalls(): CallRecord[] {
    if (!this.searchText) return this.calls;
    const q = this.searchText.toLowerCase();
    return this.calls.filter((c) => c.name.toLowerCase().includes(q));
  }

  getStatusLabel(type: string): string {
    switch (type) {
      case 'outgoing': return 'Outgoing';
      case 'incoming': return 'Incoming';
      case 'missed': return 'Missed';
      case 'video': return 'Video call';
      default: return '';
    }
  }
}
