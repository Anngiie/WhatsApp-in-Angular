import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  standalone: false,
})
export class StatusComponent implements OnInit {
  username = '';

  recentStatuses = [
    { name: 'David', time: '2h ago', viewed: false },
    { name: 'Julie', time: '4h ago', viewed: true },
    { name: 'James', time: '6h ago', viewed: true },
    { name: 'Andrew', time: 'Yesterday', viewed: false },
    { name: 'Grey', time: 'Yesterday', viewed: true },
    { name: 'Blue', time: 'Yesterday', viewed: true },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.username = user?.username || '';
    });
  }
}
