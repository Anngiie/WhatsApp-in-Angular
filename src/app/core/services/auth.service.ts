import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  email: string;
  username: string;
  displayName: string;
  about: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<User>(`${this.apiUrl}/me`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => {
          localStorage.removeItem('token');
          this.currentUserSubject.next(null);
        },
      });
    }
  }

  login(login: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.currentUserSubject.next(res.user);
        }),
        catchError((err) => throwError(() => err))
      );
  }

  register(email: string, username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { email, username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.currentUserSubject.next(res.user);
        }),
        catchError((err) => throwError(() => err))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUsername(): string {
    const user = this.currentUserSubject.value;
    return user?.displayName || user?.username || '';
  }

  updateProfile(displayName?: string, about?: string): Observable<User> {
    const body: { displayName?: string; about?: string } = {};
    if (displayName !== undefined) body.displayName = displayName;
    if (about !== undefined) body.about = about;

    return this.http.put<User>(`${this.apiUrl}/profile`, body).pipe(
      tap((user) => this.currentUserSubject.next(user)),
      catchError((err) => throwError(() => err))
    );
  }

  setUsername(name: string): Observable<User> {
    return this.updateProfile(name);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
