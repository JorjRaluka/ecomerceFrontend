import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated = false;
  userFullName = '';
  role = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userFullName = user ? `${user.firstName} ${user.lastName}` : '';
      this.role = user?.role || '';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
