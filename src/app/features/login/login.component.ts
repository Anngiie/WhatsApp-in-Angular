import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  loginField = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  error = '';
  isLoading = false;
  isRegisterMode = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  setMode(register: boolean): void {
    this.isRegisterMode = register;
    this.error = '';
  }

  onSubmit(): void {
    this.error = '';

    if (this.isRegisterMode) {
      this.handleRegister();
    } else {
      this.handleLogin();
    }
  }

  private handleLogin(): void {
    if (!this.loginField.trim() || !this.password.trim()) {
      this.error = 'Please enter your username/email and password.';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginField, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
      },
    });
  }

  private handleRegister(): void {
    if (!this.email.trim() || !this.username.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.error = 'All fields are required.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    if (this.username.length < 3) {
      this.error = 'Username must be at least 3 characters.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.email, this.username, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
