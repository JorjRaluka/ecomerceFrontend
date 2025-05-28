import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

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
    this.http.get(`${environment.luv2shopApiUrl}/status/ping`, { responseType: 'text' })
      .pipe(catchError(() => of(null)))
      .subscribe(response => {
        this.serverOnline$.next(response === 'pong');
      });
  }
}
