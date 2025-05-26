import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  public networkOnline$ = new BehaviorSubject<boolean>(navigator.onLine);
  public serverOnline$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.networkOnline$.next(true));
    window.addEventListener('offline', () => this.networkOnline$.next(false));
    this.pingServer();
    interval(10000).subscribe(() => this.pingServer());
  }

  private pingServer() {
    this.http.get('http://localhost:8080/api/status/ping', { responseType: 'text' })
      .pipe(catchError(() => of(null)))
      .subscribe(response => {
        this.serverOnline$.next(response === 'pong');
      });
  }
}
