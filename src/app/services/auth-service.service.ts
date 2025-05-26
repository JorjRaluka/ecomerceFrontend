import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/login', { email, password })
      .pipe(
        tap(user => {
          this.saveUser(user);
          this.userSubject.next(user); // 🔁 broadcast update
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.userSubject.next(null); // 🔁 broadcast logout
  }

  saveUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const userJson = sessionStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
