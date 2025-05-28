import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  message = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}
  register() {
    this.http.post(`${environment.luv2shopApiUrl}/auth/register`, this.user, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        this.message = response;
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      }
      ,
      error: err => {
        // Try to safely show the error
        this.message = '';
        this.error = typeof err.error === 'string' ? err.error : 'Registration failed.';
      }
    });
  }

}
